import type { NextApiRequest, NextApiResponse } from "next";

export const config = {
  api: {
    bodyParser: false,
  },
};

type PinataV3Response = {
  data?: { cid?: string };
  error?: unknown;
};

const readRawBody = (req: NextApiRequest): Promise<Buffer> =>
  new Promise((resolve, reject) => {
    const chunks: Buffer[] = [];
    req.on("error", reject);
    req.on("data", (chunk: Buffer) => chunks.push(chunk));
    req.on("end", () => resolve(Buffer.concat(chunks)));
  });

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const jwt =
    process.env.PINATA_JWT;

  if (!jwt) {
    return res.status(500).json({
      error:
        "Pinata JWT is not configured. Add PINATA_JWT to interface/.env.local",
    });
  }

  const contentType = req.headers["content-type"];
  if (!contentType?.includes("multipart/form-data")) {
    return res.status(400).json({ error: "Expected multipart form data" });
  }

  const rawBody = await readRawBody(req);
  const incoming = await new Response(Uint8Array.from(rawBody), {
    headers: { "content-type": contentType },
  }).formData();

  const file = incoming.get("file");
  if (!(file instanceof File)) {
    return res.status(400).json({ error: "No file provided" });
  }

  const pinataForm = new FormData();
  pinataForm.append("file", file);
  pinataForm.append("network", "public");

  const pinataRes = await fetch("https://uploads.pinata.cloud/v3/files", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
    body: pinataForm,
  });

  const data = (await pinataRes.json()) as PinataV3Response;

  if (!pinataRes.ok) {
    return res.status(pinataRes.status).json({
      error: "Pinata upload failed",
      details: data,
    });
  }

  const cid = data.data?.cid;
  if (!cid) {
    return res.status(502).json({ error: "Pinata response did not include a CID" });
  }

  return res.status(200).json({
    url: `https://gateway.pinata.cloud/ipfs/${cid}`,
  });
}
