import { createContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
// import Web3Modal from "web3modal";
import { ethers } from "ethers";
import { create as kuboRpcClient } from "kubo-rpc-client";
// import axios from "axios";
import { useRouter } from "next/navigation";

// INTERNAL IMPORT
import { VotingAddress, VotingAddressABI } from "./constants";
import type { ContractRunner } from "ethers";

// IPFS Client

// Using the Kubo RPC client library to talk to an IPFS node

const client = kuboRpcClient(
    "https://ipfs.infura.io:5001/api/v0",
);

// Contract Function

const fetchContract = (signerOrProvider: ContractRunner) =>
    new ethers.Contract(VotingAddress, VotingAddressABI, signerOrProvider);

interface VotingContextType {
    votingTitle: string;
}

export const VotingContext = createContext<VotingContextType>({
    votingTitle: "Default Voting Title",
});

interface VotingProviderProps {
    children: ReactNode;
}

export const VotingProvider = ({ children }: VotingProviderProps) => {
    const votingTitle = "My first smart contract app";
    const router = useRouter();
    const [currentAccount, setCurrentAccount] = useState('');
    const [candidateLength, setCandidateLength] = useState('');
    const pushCandidate: unknown[] = [];
    const candidateIndex: number [] = [];
    const [candidateArray, setCandidateArray] = useState<unknown[]>(pushCandidate);

    // ---- END OF CANDIDATE DATA ----

    const [error, setError] = useState('');
    const highestVote: number[] = [];

    // ---- VOTER SECTION ----

    const pushVoter: unknown[] = [];
    const [voterArray, setVoterArray] = useState<unknown[]>(pushVoter);
    const [voterLength, setVoterLength] = useState('');
    const [voterAddress, setVoterAddress] = useState<unknown[]>([]);


    return (
        <VotingContext.Provider value={{ votingTitle }}>
            {children}
        </VotingContext.Provider>
    );
};
