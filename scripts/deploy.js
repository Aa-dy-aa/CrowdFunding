const hre = require("hardhat");

async function main() {
  // Get all signers from Hardhat
  const signers = await hre.ethers.getSigners();

  // Use Account 2 (index 1)
  const deployer = signers[1]; 
  console.log("Deploying contract with account:", deployer.address);

  const CrowdFunding = await hre.ethers.getContractFactory("CrowdFunding", deployer);

  // Deploy the contract
  const crowdFunding = await CrowdFunding.deploy();
  await crowdFunding.deployed();

  console.log(`CrowdFunding deployed to ${crowdFunding.address}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
