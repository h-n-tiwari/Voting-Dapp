import { ethers } from "ethers";
import Web3modal from "web3modal";

// INTERNAL IMPORT
import { fetchContract } from "./fetchContract";

export const connectContract = async () => {
  const web3Modal = new Web3modal();
  const connection = await web3Modal.connect();
  const provider = new ethers.BrowserProvider(connection);
  const signer = await provider.getSigner();
  const contract = fetchContract(signer);

  return {
    provider,
    signer,
    contract
  };
};
