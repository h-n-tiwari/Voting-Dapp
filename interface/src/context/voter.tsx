import { createContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import { useRouter } from "next/router";
import type { NextRouter } from "next/router";

// INTERNAL IMPORT
import { connectContract } from "../utils/app-feature";

//---- VOTER FORM INPUT ----
export interface VoterFormInput {
  name: string;
  address: string;
  position: string;
}

//---- VOTING CONTEXT TYPE ----
interface VotingContextType {
  votingTitle: string;

  //---- ADDED checkIfWalletConnected to the interface ----
  checkIfWalletConnected: () => Promise<void>;

  connectWallet: () => Promise<void>;

  uploadToPinata: (file: File) => Promise<string>;

  createVoter: (
    formInput: VoterFormInput,
    fileUrl: string | null,
    router: NextRouter,
  ) => Promise<void>;
}

//---- VOTING CONTEXT ----
export const VotingContext = createContext<VotingContextType>({
  votingTitle: "Default Voting Title",

  //---- ADDED checkIfWalletConnected to the default value ----
  checkIfWalletConnected: async () => {},

  connectWallet: async () => {},

  uploadToPinata: async () => "",

  createVoter: async () => {},
});

//---- VOTING PROVIDER PROPS ----
interface VotingProviderProps {
  children: ReactNode;
}

//---- VOTING PROVIDER ----
export const VotingProvider = ({ children }: VotingProviderProps) => {
  const votingTitle = "My first smart contract app";

  const router = useRouter();

  const [currentAccount, setCurrentAccount] = useState<string>("");

  const [candidateLength, setCandidateLength] = useState<string>("");

  const pushCandidate: unknown[] = [];

  const candidateIndex: number[] = [];

  const [candidateArray, setCandidateArray] =
    useState<unknown[]>(pushCandidate);

  // ---- END OF CANDIDATE DATA ----

  const [error, setError] = useState<string>("");

  const highestVote: number[] = [];

  // ---- VOTER SECTION ----

  const pushVoter: unknown[] = [];

  const [voterArray, setVoterArray] = useState<unknown[]>(pushVoter);

  const [voterLength, setVoterLength] = useState<string>("");

  const [voterAddress, setVoterAddress] = useState<unknown[]>([]);

  // ---- CONNECTING METAMASK ----

  const checkIfWalletConnected = async () => {
    if (!window.ethereum) {
      return setError("Please install MetaMask");
    }

    const accounts = await window.ethereum.request({
      method: "eth_accounts",
    });

    if (accounts.length) {
      setCurrentAccount(accounts[0]);
    } else {
      setError("Please Install MetaMask & Connect, Reload");
    }
  };

  // ---- CONNECT WALLET ----

  const connectWallet = async () => {
    if (!window.ethereum) {
      return setError("Please Install MetaMask");
    }

    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });

    setCurrentAccount(accounts[0]);
  };

  // ---- UPLOAD VOTER IMAGE TO IPFS VIA PINATA ----

  interface PinataUploadResponse {
    url?: string;
    error?: string;
  }

  const uploadToPinata = async (file: File): Promise<string> => {
    try {
      const formData = new FormData();

      formData.append("file", file);

      const res = await fetch("/api/pinata", {
        method: "POST",
        body: formData,
      });

      const data: PinataUploadResponse = await res.json();

      if (!res.ok || !data.url) {
        throw new Error(
          data.error || `Upload failed: ${res.status} ${res.statusText}`,
        );
      }

      return data.url;
    } catch (err: unknown) {
      setError("Error uploading file to Pinata");

      throw err;
    }
  };

  // ---- CREATE VOTER ----

  const createVoter = async (
    formInput: VoterFormInput,
    fileUrl: string | null,
    _router: NextRouter,
  ) => {
    try {
      const { name, address, position } = formInput;

      // This runs in the browser DevTools console, not the `next dev` terminal.
      // console.log(name, address, position, fileUrl);

      if (!name || !address || !position) {
        return setError("Input data is missing");
      }

      if (!fileUrl) {
        return setError("Candidate image is required");
      }

      // CONNECTING SMART CONTRACT
      const { contract } = await connectContract();

      // console.log(contract);

      // CREATE CANDIDATE METADATA
      const metadata = JSON.stringify({
        name,
        address,
        position,
        image: fileUrl,
      });

      // CONVERT JSON INTO FILE
      const metadataFile = new File([metadata], "candidate.json", {
        type: "application/json",
      });

      // UPLOAD METADATA TO PINATA
      const metadataUrl = await uploadToPinata(metadataFile);

      if (!metadataUrl) {
        return setError("Failed to upload metadata");
      }

      console.log("Candidate metadata:", metadata);
      console.log("Metadata URL:", metadataUrl);
    } catch (error: unknown) {
      console.error("Error in creating voter", error);
      setError("Error in creating voter");
    }
  };

  // GET CANDIDATE DATA
  const getCandidateData = async () => {
    try {
      // CONNECTING SMART CONTRACT
      const { contract } = await connectContract();

      // ALL CANDIDATE
      const allCandidate: string[] = await contract.getCandidate();
      console.log(allCandidate);

      allCandidate.map(async (el) => {
        const singleCandidateData = await contract.getCandidatedata(el);

        pushCandidate.push(singleCandidateData);
        candidateIndex.push(singleCandidateData[2].toNumber());
      });

      //CANDIDATE LENGTH
      const allCandidateLength = await contract.getCandidateLength();
      setCandidateLength(allCandidateLength.toNumber());
    } catch (error: unknown) {
      console.log(error);
    }
  };

  return (
    <VotingContext.Provider
      value={{
        votingTitle,
        checkIfWalletConnected,
        connectWallet,
        uploadToPinata,
        createVoter,
        giveVote,
        error,
        voterArray,
        voterLength,
        voterAddress,
        currentAccount,
        candidateLength,
        candidateArray,
      }}
    >
      {children}
    </VotingContext.Provider>
  );
};
