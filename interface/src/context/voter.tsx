import { createContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
// import Web3Modal from "web3modal";
import { ethers } from "ethers";
// import { create as kuboRpcClient } from "kubo-rpc-client";
// import axios from "axios";
import { useRouter } from "next/router";
import type { NextRouter } from "next/router";

// INTERNAL IMPORT
import { VotingAddress, VotingAddressABI } from "./constants";
import type { ContractRunner } from "ethers";

// IPFS Client
// Using the Kubo RPC client library to talk to an IPFS node

// const client = kuboRpcClient(
//   "https://ipfs.infura.io:5001/api/v0"
// );

// Contract Function
const fetchContract = (signerOrProvider: ContractRunner) =>
  new ethers.Contract(
    VotingAddress,
    VotingAddressABI,
    signerOrProvider
  );

// Voter Form Input
export interface VoterFormInput {
  name: string;
  address: string;
  position: string;
}

// Voting Context Type
interface VotingContextType {
  votingTitle: string;

  // Added checkIfWalletConnected to the interface
  checkIfWalletConnected: () => Promise<void>;

  connectWallet: () => Promise<void>;

  uploadToPinata: (file: File) => Promise<string>;

  createVoter: (
    formInput: VoterFormInput,
    fileUrl: string | null,
    router: NextRouter
  ) => Promise<void>;
}

// Voting Context
export const VotingContext = createContext<VotingContextType>({
  votingTitle: "Default Voting Title",

  // Added checkIfWalletConnected to the default value
  checkIfWalletConnected: async () => {},

  connectWallet: async () => {},

  uploadToPinata: async () => "",

  createVoter: async () => {},
});

// Voting Provider Props
interface VotingProviderProps {
  children: ReactNode;
}

// Voting Provider
export const VotingProvider = ({
  children,
}: VotingProviderProps) => {
  const votingTitle = "My first smart contract app";

  const router = useRouter();

  const [currentAccount, setCurrentAccount] = useState("");

  const [candidateLength, setCandidateLength] = useState("");

  const pushCandidate: unknown[] = [];

  const candidateIndex: number[] = [];

  const [candidateArray, setCandidateArray] =
    useState<unknown[]>(pushCandidate);

  // ---- END OF CANDIDATE DATA ----

  const [error, setError] = useState("");

  const highestVote: number[] = [];

  // ---- VOTER SECTION ----

  const pushVoter: unknown[] = [];

  const [voterArray, setVoterArray] =
    useState<unknown[]>(pushVoter);

  const [voterLength, setVoterLength] = useState("");

  const [voterAddress, setVoterAddress] =
    useState<unknown[]>([]);

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
      setError(
        "Please Install MetaMask & Connect, Reload"
      );
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

  const uploadToPinata = async (
    file: File
  ): Promise<string> => {
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
          data.error ||
            `Upload failed: ${res.status} ${res.statusText}`
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
    router: NextRouter
  ) => {
    try {
      const { name, address, position } = formInput;

      console.log(
        name,
        address,
        position,
        fileUrl
      );
    } catch (err: unknown) {
      setError("Error in creating voter");

      throw err;
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
      }}
    >
      {children}
    </VotingContext.Provider>
  );
};