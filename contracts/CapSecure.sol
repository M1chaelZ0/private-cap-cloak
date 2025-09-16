// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import { SepoliaConfig } from "@fhevm/solidity/config/ZamaConfig.sol";
import { euint32, externalEuint32, euint8, ebool, FHE } from "@fhevm/solidity/lib/FHE.sol";

contract CapSecure is SepoliaConfig {
    using FHE for *;
    
    struct Investor {
        euint32 investorId;
        euint32 ownershipPercentage;
        euint32 investmentAmount;
        bool isActive;
        bool isVerified;
        address investorAddress;
        string name;
        string email;
        uint256 joinDate;
        uint256 lastUpdate;
    }
    
    struct EquityTransaction {
        euint32 transactionId;
        euint32 fromInvestorId;
        euint32 toInvestorId;
        euint32 equityAmount;
        euint32 transactionFee;
        bool isCompleted;
        address initiator;
        uint256 timestamp;
        string transactionHash;
    }
    
    struct CapTable {
        euint32 totalShares;
        euint32 outstandingShares;
        euint32 reservedShares;
        euint32 investorCount;
        bool isActive;
        address companyAddress;
        string companyName;
        uint256 createdAt;
        uint256 lastUpdated;
    }
    
    struct VestingSchedule {
        euint32 investorId;
        euint32 totalVested;
        euint32 vestedAmount;
        euint32 cliffPeriod;
        euint32 vestingPeriod;
        bool isActive;
        uint256 startDate;
        uint256 endDate;
    }
    
    mapping(uint256 => Investor) public investors;
    mapping(uint256 => EquityTransaction) public transactions;
    mapping(uint256 => VestingSchedule) public vestingSchedules;
    mapping(address => euint32) public investorReputation;
    mapping(address => euint32) public companyReputation;
    
    CapTable public capTable;
    
    uint256 public investorCounter;
    uint256 public transactionCounter;
    uint256 public vestingCounter;
    
    address public owner;
    address public verifier;
    address public companyWallet;
    
    event InvestorAdded(uint256 indexed investorId, address indexed investorAddress, string name);
    event EquityTransferred(uint256 indexed transactionId, uint256 indexed fromInvestorId, uint256 indexed toInvestorId, uint32 amount);
    event VestingUpdated(uint256 indexed vestingId, uint256 indexed investorId, uint32 vestedAmount);
    event CapTableUpdated(uint256 indexed totalShares, uint256 indexed outstandingShares);
    event InvestorVerified(uint256 indexed investorId, bool isVerified);
    event ReputationUpdated(address indexed user, uint32 reputation);
    
    constructor(address _verifier, address _companyWallet, string memory _companyName) {
        owner = msg.sender;
        verifier = _verifier;
        companyWallet = _companyWallet;
        
        capTable = CapTable({
            totalShares: FHE.asEuint32(1000000), // 1 million total shares
            outstandingShares: FHE.asEuint32(0),
            reservedShares: FHE.asEuint32(200000), // 20% reserved for employees
            investorCount: FHE.asEuint32(0),
            isActive: true,
            companyAddress: _companyWallet,
            companyName: _companyName,
            createdAt: block.timestamp,
            lastUpdated: block.timestamp
        });
    }
    
    function addInvestor(
        address _investorAddress,
        string memory _name,
        string memory _email,
        externalEuint32 _ownershipPercentage,
        externalEuint32 _investmentAmount,
        bytes calldata inputProof
    ) public returns (uint256) {
        require(_investorAddress != address(0), "Invalid investor address");
        require(bytes(_name).length > 0, "Investor name cannot be empty");
        require(msg.sender == owner || msg.sender == verifier, "Unauthorized");
        
        uint256 investorId = investorCounter++;
        
        // Convert external encrypted values to internal
        euint32 internalOwnership = FHE.fromExternal(_ownershipPercentage, inputProof);
        euint32 internalInvestment = FHE.fromExternal(_investmentAmount, inputProof);
        
        investors[investorId] = Investor({
            investorId: FHE.asEuint32(0), // Will be set properly later
            ownershipPercentage: internalOwnership,
            investmentAmount: internalInvestment,
            isActive: true,
            isVerified: false,
            investorAddress: _investorAddress,
            name: _name,
            email: _email,
            joinDate: block.timestamp,
            lastUpdate: block.timestamp
        });
        
        // Update cap table
        capTable.outstandingShares = FHE.add(capTable.outstandingShares, internalOwnership);
        capTable.investorCount = FHE.add(capTable.investorCount, FHE.asEuint32(1));
        capTable.lastUpdated = block.timestamp;
        
        emit InvestorAdded(investorId, _investorAddress, _name);
        emit CapTableUpdated(0, 0); // Values will be decrypted off-chain
        return investorId;
    }
    
    function transferEquity(
        uint256 _fromInvestorId,
        uint256 _toInvestorId,
        externalEuint32 _equityAmount,
        externalEuint32 _transactionFee,
        bytes calldata inputProof
    ) public returns (uint256) {
        require(investors[_fromInvestorId].investorAddress != address(0), "From investor does not exist");
        require(investors[_toInvestorId].investorAddress != address(0), "To investor does not exist");
        require(investors[_fromInvestorId].isActive, "From investor is not active");
        require(investors[_toInvestorId].isActive, "To investor is not active");
        require(msg.sender == investors[_fromInvestorId].investorAddress || msg.sender == owner, "Unauthorized");
        
        uint256 transactionId = transactionCounter++;
        
        // Convert external encrypted values to internal
        euint32 internalEquityAmount = FHE.fromExternal(_equityAmount, inputProof);
        euint32 internalTransactionFee = FHE.fromExternal(_transactionFee, inputProof);
        
        transactions[transactionId] = EquityTransaction({
            transactionId: FHE.asEuint32(0), // Will be set properly later
            fromInvestorId: FHE.asEuint32(_fromInvestorId),
            toInvestorId: FHE.asEuint32(_toInvestorId),
            equityAmount: internalEquityAmount,
            transactionFee: internalTransactionFee,
            isCompleted: false,
            initiator: msg.sender,
            timestamp: block.timestamp,
            transactionHash: ""
        });
        
        // Update investor ownership percentages
        investors[_fromInvestorId].ownershipPercentage = FHE.sub(investors[_fromInvestorId].ownershipPercentage, internalEquityAmount);
        investors[_toInvestorId].ownershipPercentage = FHE.add(investors[_toInvestorId].ownershipPercentage, internalEquityAmount);
        
        // Mark transaction as completed
        transactions[transactionId].isCompleted = true;
        
        emit EquityTransferred(transactionId, _fromInvestorId, _toInvestorId, 0); // Amount will be decrypted off-chain
        return transactionId;
    }
    
    function createVestingSchedule(
        uint256 _investorId,
        externalEuint32 _totalVested,
        externalEuint32 _cliffPeriod,
        externalEuint32 _vestingPeriod,
        bytes calldata inputProof
    ) public returns (uint256) {
        require(investors[_investorId].investorAddress != address(0), "Investor does not exist");
        require(msg.sender == owner || msg.sender == verifier, "Unauthorized");
        
        uint256 vestingId = vestingCounter++;
        
        // Convert external encrypted values to internal
        euint32 internalTotalVested = FHE.fromExternal(_totalVested, inputProof);
        euint32 internalCliffPeriod = FHE.fromExternal(_cliffPeriod, inputProof);
        euint32 internalVestingPeriod = FHE.fromExternal(_vestingPeriod, inputProof);
        
        vestingSchedules[vestingId] = VestingSchedule({
            investorId: FHE.asEuint32(_investorId),
            totalVested: internalTotalVested,
            vestedAmount: FHE.asEuint32(0),
            cliffPeriod: internalCliffPeriod,
            vestingPeriod: internalVestingPeriod,
            isActive: true,
            startDate: block.timestamp,
            endDate: block.timestamp + 365 days // Default 1 year
        });
        
        return vestingId;
    }
    
    function updateVesting(uint256 _vestingId) public {
        require(vestingSchedules[_vestingId].isActive, "Vesting schedule is not active");
        require(block.timestamp >= vestingSchedules[_vestingId].startDate, "Vesting has not started");
        
        VestingSchedule storage vesting = vestingSchedules[_vestingId];
        uint256 timeElapsed = block.timestamp - vesting.startDate;
        
        // Calculate vested amount based on time elapsed
        // This is a simplified calculation - in practice, you'd want more sophisticated vesting logic
        if (timeElapsed >= vesting.endDate - vesting.startDate) {
            vesting.vestedAmount = vesting.totalVested;
        } else {
            // Linear vesting calculation
            uint256 vestingProgress = (timeElapsed * 100) / (vesting.endDate - vesting.startDate);
            vesting.vestedAmount = FHE.mul(vesting.totalVested, FHE.asEuint32(uint32(vestingProgress)));
        }
        
        emit VestingUpdated(_vestingId, 0, 0); // Values will be decrypted off-chain
    }
    
    function verifyInvestor(uint256 _investorId, bool _isVerified) public {
        require(msg.sender == verifier, "Only verifier can verify investors");
        require(investors[_investorId].investorAddress != address(0), "Investor does not exist");
        
        investors[_investorId].isVerified = _isVerified;
        investors[_investorId].lastUpdate = block.timestamp;
        
        emit InvestorVerified(_investorId, _isVerified);
    }
    
    function updateReputation(address _user, euint32 _reputation) public {
        require(msg.sender == verifier, "Only verifier can update reputation");
        require(_user != address(0), "Invalid user address");
        
        // Determine if user is investor or company based on context
        bool isInvestor = false;
        for (uint256 i = 0; i < investorCounter; i++) {
            if (investors[i].investorAddress == _user) {
                isInvestor = true;
                break;
            }
        }
        
        if (isInvestor) {
            investorReputation[_user] = _reputation;
        } else {
            companyReputation[_user] = _reputation;
        }
        
        emit ReputationUpdated(_user, 0); // FHE.decrypt(_reputation) - will be decrypted off-chain
    }
    
    function getInvestorInfo(uint256 _investorId) public view returns (
        string memory name,
        string memory email,
        uint8 ownershipPercentage,
        uint8 investmentAmount,
        bool isActive,
        bool isVerified,
        address investorAddress,
        uint256 joinDate,
        uint256 lastUpdate
    ) {
        Investor storage investor = investors[_investorId];
        return (
            investor.name,
            investor.email,
            0, // FHE.decrypt(investor.ownershipPercentage) - will be decrypted off-chain
            0, // FHE.decrypt(investor.investmentAmount) - will be decrypted off-chain
            investor.isActive,
            investor.isVerified,
            investor.investorAddress,
            investor.joinDate,
            investor.lastUpdate
        );
    }
    
    function getTransactionInfo(uint256 _transactionId) public view returns (
        uint8 fromInvestorId,
        uint8 toInvestorId,
        uint8 equityAmount,
        uint8 transactionFee,
        bool isCompleted,
        address initiator,
        uint256 timestamp,
        string memory transactionHash
    ) {
        EquityTransaction storage transaction = transactions[_transactionId];
        return (
            0, // FHE.decrypt(transaction.fromInvestorId) - will be decrypted off-chain
            0, // FHE.decrypt(transaction.toInvestorId) - will be decrypted off-chain
            0, // FHE.decrypt(transaction.equityAmount) - will be decrypted off-chain
            0, // FHE.decrypt(transaction.transactionFee) - will be decrypted off-chain
            transaction.isCompleted,
            transaction.initiator,
            transaction.timestamp,
            transaction.transactionHash
        );
    }
    
    function getVestingInfo(uint256 _vestingId) public view returns (
        uint8 investorId,
        uint8 totalVested,
        uint8 vestedAmount,
        uint8 cliffPeriod,
        uint8 vestingPeriod,
        bool isActive,
        uint256 startDate,
        uint256 endDate
    ) {
        VestingSchedule storage vesting = vestingSchedules[_vestingId];
        return (
            0, // FHE.decrypt(vesting.investorId) - will be decrypted off-chain
            0, // FHE.decrypt(vesting.totalVested) - will be decrypted off-chain
            0, // FHE.decrypt(vesting.vestedAmount) - will be decrypted off-chain
            0, // FHE.decrypt(vesting.cliffPeriod) - will be decrypted off-chain
            0, // FHE.decrypt(vesting.vestingPeriod) - will be decrypted off-chain
            vesting.isActive,
            vesting.startDate,
            vesting.endDate
        );
    }
    
    function getCapTableInfo() public view returns (
        string memory companyName,
        uint8 totalShares,
        uint8 outstandingShares,
        uint8 reservedShares,
        uint8 investorCount,
        bool isActive,
        address companyAddress,
        uint256 createdAt,
        uint256 lastUpdated
    ) {
        return (
            capTable.companyName,
            0, // FHE.decrypt(capTable.totalShares) - will be decrypted off-chain
            0, // FHE.decrypt(capTable.outstandingShares) - will be decrypted off-chain
            0, // FHE.decrypt(capTable.reservedShares) - will be decrypted off-chain
            0, // FHE.decrypt(capTable.investorCount) - will be decrypted off-chain
            capTable.isActive,
            capTable.companyAddress,
            capTable.createdAt,
            capTable.lastUpdated
        );
    }
    
    function getInvestorReputation(address _investor) public view returns (uint8) {
        return 0; // FHE.decrypt(investorReputation[_investor]) - will be decrypted off-chain
    }
    
    function getCompanyReputation(address _company) public view returns (uint8) {
        return 0; // FHE.decrypt(companyReputation[_company]) - will be decrypted off-chain
    }
    
    function withdrawFunds(uint256 _amount) public {
        require(msg.sender == owner, "Only owner can withdraw funds");
        require(address(this).balance >= _amount, "Insufficient contract balance");
        
        payable(companyWallet).transfer(_amount);
    }
    
    // Fallback function to receive ETH
    receive() external payable {}
}
