const { ethers } = require("hardhat");
require("dotenv").config();

async function main() {
  console.log("🚀 Starting CapSecure contract deployment...");
  
  // Get the deployer account
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with account:", deployer.address);
  
  // Check balance
  const balance = await ethers.provider.getBalance(deployer.address);
  console.log("Account balance:", ethers.formatEther(balance), "ETH");
  
  if (balance < ethers.parseEther("0.01")) {
    console.warn("⚠️  Warning: Low balance. You may need more ETH for deployment.");
  }
  
  // Get the contract factory
  const CapSecure = await ethers.getContractFactory("CapSecure");
  
  // Configuration from environment variables or defaults
  const verifier = process.env.VERIFIER_ADDRESS || "0x742d35Cc6448C10b4c6abfC9A6E5d89f9c4a";
  const companyWallet = process.env.COMPANY_WALLET || deployer.address;
  const companyName = process.env.COMPANY_NAME || "CapSecure Startup";
  
  console.log("📋 Deployment Configuration:");
  console.log("  Verifier:", verifier);
  console.log("  Company Wallet:", companyWallet);
  console.log("  Company Name:", companyName);
  
  // Deploy the contract
  console.log("⏳ Deploying CapSecure contract...");
  
  const capSecure = await CapSecure.deploy(verifier, companyWallet, companyName);
  
  console.log("⏳ Waiting for deployment confirmation...");
  await capSecure.waitForDeployment();
  
  const contractAddress = await capSecure.getAddress();
  
  console.log("✅ CapSecure deployed successfully!");
  console.log("📍 Contract Address:", contractAddress);
  console.log("🔗 Sepolia Etherscan:", `https://sepolia.etherscan.io/address/${contractAddress}`);
  
  // Save deployment info
  const deploymentInfo = {
    contractAddress,
    verifier,
    companyWallet,
    companyName,
    deployer: deployer.address,
    network: "sepolia",
    timestamp: new Date().toISOString(),
    transactionHash: capSecure.deploymentTransaction().hash
  };
  
  console.log("📄 Deployment Information:");
  console.log(JSON.stringify(deploymentInfo, null, 2));
  
  // Instructions for next steps
  console.log("\n🎯 Next Steps:");
  console.log("1. Update CONTRACT_ADDRESS in src/config/contract.ts");
  console.log("2. Run: npm run build:vercel");
  console.log("3. Deploy to Vercel: npm run deploy");
  console.log("4. Test the application with the deployed contract");
}

main()
  .then(() => {
    console.log("🎉 Deployment completed successfully!");
    process.exit(0);
  })
  .catch((error) => {
    console.error("❌ Deployment failed:", error);
    process.exit(1);
  });
