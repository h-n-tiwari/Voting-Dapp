import { network } from "hardhat";

async function main() {
    const { ethers } = await network.create();

    const Create = await ethers.getContractFactory("Create");
    const create = await Create.deploy();

    await create.waitForDeployment();

    console.log("Lock with 1 ETH deployed to:", await create.getAddress());
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
