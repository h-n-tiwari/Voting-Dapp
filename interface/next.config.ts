import path from "node:path";
import { fileURLToPath } from "node:url";
import type { NextConfig } from "next";

const interfaceDir = path.dirname(fileURLToPath(import.meta.url));

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  // Pin both to this app so Next does not treat the Hardhat repo as the workspace.
  outputFileTracingRoot: interfaceDir,
  turbopack: {
    root: interfaceDir,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "gateway.pinata.cloud",
        pathname: "/ipfs/**",
      },
    ],
  },
};

export default nextConfig;
