// import { createContext, useState, useEffect } from "react";
// import type { ReactNode } from "react";
// import Web3Modal from "web3modal";
// import { ether, ContractRunners } from "ethers";
// import { create as ipfsHttpClient } from "ipfs-http-client";
// import axios from "axios";

// // INTERNAL IMPORT
// import { VotingAddress, VotingAddressABI } from './constants';

// // IPFS Client
// const client = ipfsHttpClient('https://ipfs.infura.io:5001/api/v0');

// // Contract Function
// const fetchContract = (signerOrProvider: ContractRunner ) => new ethers.Contract(VotingAddress, VotingAddressABI, signerOrProvider);

// // Types

// interface VotingContextType {
//   votingTitle: string;
// }

// interface VotingProviderProps {
//   children: ReactNode;
// }
// export const VotingContext = React.createContext();

// export const VotingProvider = ({ children }: VotingProviderProps) => {
//     const votingTitle = "My first smart contract app";
//     return (
//         <VotingContext.Provider value={{ votingTitle }}>
//             {children}
//         </VotingContext.Provider>
//     );
// };

// const Voter = () => {
//   return (
//     <div>voter</div>
//   )
// }

// export default Voter;

import { createContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import Web3Modal from "web3modal";
import { ethers } from "ethers";
import { create as ipfsHttpClient } from "ipfs-http-client";
import axios from "axios";

// INTERNAL IMPORT
import { VotingAddress, VotingAddressABI } from "./constants";
import type { ContractRunner } from "ethers";

// IPFS Client

const client = ipfsHttpClient("https://ipfs.infura.io:5001/api/v0");

// // Contract Function

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

    return (
        <VotingContext.Provider value={{ votingTitle }}>
            {children}
        </VotingContext.Provider>
    );
};

const Voter = () => {
    return <div>voter</div>;
};

export default Voter;