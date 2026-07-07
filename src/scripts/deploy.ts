import hre from "hardhat";

async function main() {
    const currentTimestampInSeconds = Math.round(Date.now() / 1000);
    const ONE_YEAR_IN_SECS = 365 * 24 * 60 * 60;
    const unlockTime = currentTimestampInSeconds + ONE_YEAR_IN_SECS;

    const lockedAmount = hre.ethers.parseEther("1");

    const Lock = await hre.ethers.getContractFactory("Lock");
    const lock = await Lock.deploy();

    await lock.waitForDeployment();

    console.log("Lock with 1 ETH deployed to:", await lock.getAddress());
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
