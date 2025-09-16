// Contract ABI for CapSecure
export const capSecureABI = [
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_verifier",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "_companyWallet",
        "type": "address"
      },
      {
        "internalType": "string",
        "name": "_companyName",
        "type": "string"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "totalShares",
        "type": "uint256"
      },
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "outstandingShares",
        "type": "uint256"
      }
    ],
    "name": "CapTableUpdated",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "investorId",
        "type": "uint256"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "investorAddress",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "name",
        "type": "string"
      }
    ],
    "name": "InvestorAdded",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "investorId",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "bool",
        "name": "isVerified",
        "type": "bool"
      }
    ],
    "name": "InvestorVerified",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "transactionId",
        "type": "uint256"
      },
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "fromInvestorId",
        "type": "uint256"
      },
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "toInvestorId",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint32",
        "name": "amount",
        "type": "uint32"
      }
    ],
    "name": "EquityTransferred",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "vestingId",
        "type": "uint256"
      },
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "investorId",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint32",
        "name": "vestedAmount",
        "type": "uint32"
      }
    ],
    "name": "VestingUpdated",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "user",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint32",
        "name": "reputation",
        "type": "uint32"
      }
    ],
    "name": "ReputationUpdated",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_investorAddress",
        "type": "address"
      },
      {
        "internalType": "string",
        "name": "_name",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_email",
        "type": "string"
      },
      {
        "internalType": "uint32",
        "name": "_ownershipPercentage",
        "type": "uint32"
      },
      {
        "internalType": "uint32",
        "name": "_investmentAmount",
        "type": "uint32"
      },
      {
        "internalType": "bytes",
        "name": "inputProof",
        "type": "bytes"
      }
    ],
    "name": "addInvestor",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_investorId",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_totalVested",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_cliffPeriod",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_vestingPeriod",
        "type": "uint256"
      },
      {
        "internalType": "bytes",
        "name": "inputProof",
        "type": "bytes"
      }
    ],
    "name": "createVestingSchedule",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getCapTableInfo",
    "outputs": [
      {
        "internalType": "string",
        "name": "companyName",
        "type": "string"
      },
      {
        "internalType": "uint8",
        "name": "totalShares",
        "type": "uint8"
      },
      {
        "internalType": "uint8",
        "name": "outstandingShares",
        "type": "uint8"
      },
      {
        "internalType": "uint8",
        "name": "reservedShares",
        "type": "uint8"
      },
      {
        "internalType": "uint8",
        "name": "investorCount",
        "type": "uint8"
      },
      {
        "internalType": "bool",
        "name": "isActive",
        "type": "bool"
      },
      {
        "internalType": "address",
        "name": "companyAddress",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "createdAt",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "lastUpdated",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_investorId",
        "type": "uint256"
      }
    ],
    "name": "getInvestorInfo",
    "outputs": [
      {
        "internalType": "string",
        "name": "name",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "email",
        "type": "string"
      },
      {
        "internalType": "uint8",
        "name": "ownershipPercentage",
        "type": "uint8"
      },
      {
        "internalType": "uint8",
        "name": "investmentAmount",
        "type": "uint8"
      },
      {
        "internalType": "bool",
        "name": "isActive",
        "type": "bool"
      },
      {
        "internalType": "bool",
        "name": "isVerified",
        "type": "bool"
      },
      {
        "internalType": "address",
        "name": "investorAddress",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "joinDate",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "lastUpdate",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_fromInvestorId",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_toInvestorId",
        "type": "uint256"
      },
      {
        "internalType": "uint32",
        "name": "_equityAmount",
        "type": "uint32"
      },
      {
        "internalType": "uint32",
        "name": "_transactionFee",
        "type": "uint32"
      },
      {
        "internalType": "bytes",
        "name": "inputProof",
        "type": "bytes"
      }
    ],
    "name": "transferEquity",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_investorId",
        "type": "uint256"
      },
      {
        "internalType": "bool",
        "name": "_isVerified",
        "type": "bool"
      }
    ],
    "name": "verifyInvestor",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_amount",
        "type": "uint256"
      }
    ],
    "name": "withdrawFunds",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "stateMutability": "payable",
    "type": "receive"
  }
] as const;
