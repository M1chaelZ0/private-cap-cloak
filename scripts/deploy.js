const { ethers } = require("hardhat");

async function main() {
  // Get the contract factory
  const CapSecure = await ethers.getContractFactory("CapSecure");
  
  // Deploy the contract
  console.log("Deploying CapSecure contract...");
  
  // You'll need to replace these addresses with actual addresses
  const verifier = "0x742d35Cc6448C10b4c6abfC9A6E5d89f9c4a"; // Replace with actual verifier address
  const companyWallet = "0x742d35Cc6448C10b4c6abfC9A6E5d89f9c4a"; // Replace with actual company wallet
  const companyName = "CapSecure Startup";
  
  const capSecure = await CapSecure.deploy(verifier, companyWallet, companyName);
  
  await capSecure.waitForDeployment();
  
  const contractAddress = await capSecure.getAddress();
  
  console.log("CapSecure deployed to:", contractAddress);
  console.log("Verifier:", verifier);
  console.log("Company Wallet:", companyWallet);
  console.log("Company Name:", companyName);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
