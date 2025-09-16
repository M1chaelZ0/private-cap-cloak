const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("CapSecure", function () {
  let capSecure;
  let owner;
  let verifier;
  let companyWallet;
  let companyName;

  beforeEach(async function () {
    [owner, verifier, companyWallet] = await ethers.getSigners();
    companyName = "Test Company";

    const CapSecure = await ethers.getContractFactory("CapSecure");
    capSecure = await CapSecure.deploy(verifier.address, companyWallet.address, companyName);
    await capSecure.waitForDeployment();
  });

  describe("Deployment", function () {
    it("Should set the right owner", async function () {
      expect(await capSecure.owner()).to.equal(owner.address);
    });

    it("Should set the right verifier", async function () {
      expect(await capSecure.verifier()).to.equal(verifier.address);
    });

    it("Should set the right company wallet", async function () {
      expect(await capSecure.companyWallet()).to.equal(companyWallet.address);
    });

    it("Should set the right company name", async function () {
      expect(await capSecure.companyName()).to.equal(companyName);
    });
  });

  describe("Access Control", function () {
    it("Should allow only owner to add investors", async function () {
      const [_, nonOwner] = await ethers.getSigners();
      
      await expect(
        capSecure.connect(nonOwner).addInvestor(
          nonOwner.address,
          "Test Investor",
          "test@example.com",
          "0x0000000000000000000000000000000000000000000000000000000000000001",
          "0x0000000000000000000000000000000000000000000000000000000000000002",
          "0x"
        )
      ).to.be.revertedWith("Only owner can add investors");
    });

    it("Should allow only verifier to verify investors", async function () {
      const [_, nonVerifier] = await ethers.getSigners();
      
      await expect(
        capSecure.connect(nonVerifier).verifyInvestor(0, true)
      ).to.be.revertedWith("Only verifier can verify investors");
    });
  });

  describe("Investor Management", function () {
    it("Should add investor successfully", async function () {
      const investorAddress = "0x742d35Cc6448C10b4c6abfC9A6E5d89f9c4a";
      const name = "Test Investor";
      const email = "test@example.com";
      
      await expect(
        capSecure.addInvestor(
          investorAddress,
          name,
          email,
          "0x0000000000000000000000000000000000000000000000000000000000000001",
          "0x0000000000000000000000000000000000000000000000000000000000000002",
          "0x"
        )
      ).to.emit(capSecure, "InvestorAdded")
        .withArgs(0, investorAddress, name);
    });

    it("Should verify investor successfully", async function () {
      // First add an investor
      const investorAddress = "0x742d35Cc6448C10b4c6abfC9A6E5d89f9c4a";
      await capSecure.addInvestor(
        investorAddress,
        "Test Investor",
        "test@example.com",
        "0x0000000000000000000000000000000000000000000000000000000000000001",
        "0x0000000000000000000000000000000000000000000000000000000000000002",
        "0x"
      );

      // Then verify the investor
      await expect(
        capSecure.connect(verifier).verifyInvestor(0, true)
      ).to.emit(capSecure, "InvestorVerified")
        .withArgs(0, true);
    });
  });

  describe("Cap Table Management", function () {
    it("Should initialize cap table correctly", async function () {
      const capTable = await capSecure.getCapTable();
      expect(capTable.companyName).to.equal(companyName);
      expect(capTable.companyAddress).to.equal(companyWallet.address);
      expect(capTable.isActive).to.be.true;
    });
  });
});
