import { defineConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

module.exports = {
  solidity: "0.8.34",
  networks: {
    hardhat: {
      chainId: 1337,
    },
  },
};
