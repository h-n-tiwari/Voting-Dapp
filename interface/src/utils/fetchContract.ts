import { ethers } from "ethers";
import type { ContractRunner } from "ethers";

// INTERNAL IMPORT
import { VotingAddress, VotingAddressABI } from "@/context/constants";


export const fetchContract = (
  signerOrProvider: ContractRunner
) => {
  return new ethers.Contract(
    VotingAddress,
    VotingAddressABI,
    signerOrProvider
  );
};
