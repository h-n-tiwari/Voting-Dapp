import { defineConfig } from "hardhat/config";
import hardhatethers from "@nomicfoundation/hardhat-ethers"

export default defineConfig({
    plugins: [hardhatethers],

    solidity: {
        version: "0.8.34",
        settings: {
            evmVersion: "shanghai",
        },
    },

    networks: {
        hardhat: {
            type: "edr-simulated",
            chainId: 1337,
        },
    },
});
