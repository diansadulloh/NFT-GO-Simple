export const ERC721_CONTRACT_ABI = [
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "name",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "symbol",
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
        "internalType": "address",
        "name": "_owner",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "_approved",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "_tokenId",
        "type": "uint256"
      }
    ],
    "name": "Approval",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "_owner",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "_operator",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "bool",
        "name": "_approved",
        "type": "bool"
      }
    ],
    "name": "ApprovalForAll",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "_from",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "_to",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "_tokenId",
        "type": "uint256"
      }
    ],
    "name": "Transfer",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_approved",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "_tokenId",
        "type": "uint256"
      }
    ],
    "name": "approve",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_owner",
        "type": "address"
      }
    ],
    "name": "balanceOf",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "burn",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_tokenId",
        "type": "uint256"
      }
    ],
    "name": "getApproved",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_owner",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "_operator",
        "type": "address"
      }
    ],
    "name": "isApprovedForAll",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "internalType": "string",
        "name": "uri",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "num",
        "type": "uint256"
      }
    ],
    "name": "mint",
    "outputs": [
      {
        "internalType": "uint256[]",
        "name": "",
        "type": "uint256[]"
      }
    ],
    "stateMutability": "payable",
    "type": "function",
    "payable": true
  },
  {
    "inputs": [],
    "name": "name",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_operator",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "_from",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "_tokenId",
        "type": "uint256"
      },
      {
        "internalType": "bytes",
        "name": "_data",
        "type": "bytes"
      }
    ],
    "name": "onERC721Received",
    "outputs": [
      {
        "internalType": "bytes4",
        "name": "",
        "type": "bytes4"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_tokenId",
        "type": "uint256"
      }
    ],
    "name": "ownerOf",
    "outputs": [
      {
        "internalType": "address",
        "name": "_owner",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_from",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "_to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "_tokenId",
        "type": "uint256"
      }
    ],
    "name": "safeTransferFrom",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_from",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "_to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "_tokenId",
        "type": "uint256"
      },
      {
        "internalType": "bytes",
        "name": "_data",
        "type": "bytes"
      }
    ],
    "name": "safeTransferFrom",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_operator",
        "type": "address"
      },
      {
        "internalType": "bool",
        "name": "_approved",
        "type": "bool"
      }
    ],
    "name": "setApprovalForAll",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "newFee",
        "type": "uint256"
      }
    ],
    "name": "setFee",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes4",
        "name": "_interfaceID",
        "type": "bytes4"
      }
    ],
    "name": "supportsInterface",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [],
    "name": "symbol",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_tokenId",
        "type": "uint256"
      }
    ],
    "name": "tokenURI",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_from",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "_to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "_tokenId",
        "type": "uint256"
      }
    ],
    "name": "transferFrom",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address payable",
        "name": "_to",
        "type": "address"
      }
    ],
    "name": "withdraw",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "totalSupply",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_index",
        "type": "uint256"
      }
    ],
    "name": "tokenByIndex",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_owner",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "_index",
        "type": "uint256"
      }
    ],
    "name": "tokenOfOwnerByIndex",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  }
];

export const ERC1155_CONTRACT_ABI = [
  {
    "inputs": [],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "_owner",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "_operator",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "bool",
        "name": "_approved",
        "type": "bool"
      }
    ],
    "name": "ApprovalForAll",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "_operator",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "_from",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "_to",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256[]",
        "name": "_ids",
        "type": "uint256[]"
      },
      {
        "indexed": false,
        "internalType": "uint256[]",
        "name": "_values",
        "type": "uint256[]"
      }
    ],
    "name": "TransferBatch",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "_operator",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "_from",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "_to",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "_id",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "_value",
        "type": "uint256"
      }
    ],
    "name": "TransferSingle",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "string",
        "name": "_value",
        "type": "string"
      },
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "_id",
        "type": "uint256"
      }
    ],
    "name": "URI",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_owner",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "_id",
        "type": "uint256"
      }
    ],
    "name": "balanceOf",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "address[]",
        "name": "_owners",
        "type": "address[]"
      },
      {
        "internalType": "uint256[]",
        "name": "_ids",
        "type": "uint256[]"
      }
    ],
    "name": "balanceOfBatch",
    "outputs": [
      {
        "internalType": "uint256[]",
        "name": "",
        "type": "uint256[]"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "creators",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_id",
        "type": "uint256"
      }
    ],
    "name": "getNonFungibleBaseType",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "pure",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_id",
        "type": "uint256"
      }
    ],
    "name": "getNonFungibleIndex",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "pure",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_owner",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "_operator",
        "type": "address"
      }
    ],
    "name": "isApprovedForAll",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_id",
        "type": "uint256"
      }
    ],
    "name": "isFungible",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "pure",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_id",
        "type": "uint256"
      }
    ],
    "name": "isNonFungible",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "pure",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_id",
        "type": "uint256"
      }
    ],
    "name": "isNonFungibleBaseType",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "pure",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_id",
        "type": "uint256"
      }
    ],
    "name": "isNonFungibleItem",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "pure",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "maxIndex",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_operator",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "_from",
        "type": "address"
      },
      {
        "internalType": "uint256[]",
        "name": "_ids",
        "type": "uint256[]"
      },
      {
        "internalType": "uint256[]",
        "name": "_values",
        "type": "uint256[]"
      },
      {
        "internalType": "bytes",
        "name": "_data",
        "type": "bytes"
      }
    ],
    "name": "onERC1155BatchReceived",
    "outputs": [
      {
        "internalType": "bytes4",
        "name": "",
        "type": "bytes4"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_operator",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "_from",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "_id",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_value",
        "type": "uint256"
      },
      {
        "internalType": "bytes",
        "name": "_data",
        "type": "bytes"
      }
    ],
    "name": "onERC1155Received",
    "outputs": [
      {
        "internalType": "bytes4",
        "name": "",
        "type": "bytes4"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_id",
        "type": "uint256"
      }
    ],
    "name": "ownerOf",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_from",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "_to",
        "type": "address"
      },
      {
        "internalType": "uint256[]",
        "name": "_ids",
        "type": "uint256[]"
      },
      {
        "internalType": "uint256[]",
        "name": "_values",
        "type": "uint256[]"
      },
      {
        "internalType": "bytes",
        "name": "_data",
        "type": "bytes"
      }
    ],
    "name": "safeBatchTransferFrom",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_from",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "_to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "_id",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_value",
        "type": "uint256"
      },
      {
        "internalType": "bytes",
        "name": "_data",
        "type": "bytes"
      }
    ],
    "name": "safeTransferFrom",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_operator",
        "type": "address"
      },
      {
        "internalType": "bool",
        "name": "_approved",
        "type": "bool"
      }
    ],
    "name": "setApprovalForAll",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes4",
        "name": "_interfaceId",
        "type": "bytes4"
      }
    ],
    "name": "supportsInterface",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "typeToUris",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_uri",
        "type": "string"
      },
      {
        "internalType": "bool",
        "name": "_isNF",
        "type": "bool"
      }
    ],
    "name": "create",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "_type",
        "type": "uint256"
      }
    ],
    "stateMutability": "payable",
    "type": "function",
    "payable": true
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_type",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "_to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "num",
        "type": "uint256"
      }
    ],
    "name": "mintNonFungible",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function",
    "payable": true
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_type",
        "type": "uint256"
      },
      {
        "internalType": "address[]",
        "name": "_to",
        "type": "address[]"
      }
    ],
    "name": "mintNonFungible",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function",
    "payable": true
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_id",
        "type": "uint256"
      },
      {
        "internalType": "address[]",
        "name": "_to",
        "type": "address[]"
      },
      {
        "internalType": "uint256[]",
        "name": "_quantities",
        "type": "uint256[]"
      }
    ],
    "name": "mintFungible",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function",
    "payable": true
  },
  {
    "inputs": [],
    "name": "allUris",
    "outputs": [
      {
        "internalType": "uint256[]",
        "name": "_types",
        "type": "uint256[]"
      },
      {
        "internalType": "bytes1[71][]",
        "name": "_uris",
        "type": "bytes1[71][]"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "address payable",
        "name": "_to",
        "type": "address"
      }
    ],
    "name": "withdraw",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];

export const NFTGO721_ADDRESSS = '0x0A6478DdB01F26Bf59436B3C509237e5361af5B9';

export const NFTGO1155_ADDRESS = '0x39058DD94b7737b20ebf5FDc297c7D1eD8DDAFBD';

export const ERC721_CONTRACT_BYTECODE = "0x608060405260006003556611c37937e080006006553480156200002157600080fd5b506040516200407d3803806200407d833981810160405260408110156200004757600080fd5b81019080805160405193929190846401000000008211156200006857600080fd5b838201915060208201858111156200007f57600080fd5b82518660018202830111640100000000821117156200009d57600080fd5b8083526020830192505050908051906020019080838360005b83811015620000d3578082015181840152602081019050620000b6565b50505050905090810190601f168015620001015780820380516001836020036101000a031916815260200191505b50604052602001805160405193929190846401000000008211156200012557600080fd5b838201915060208201858111156200013c57600080fd5b82518660018202830111640100000000821117156200015a57600080fd5b8083526020830192505050908051906020019080838360005b838110156200019057808201518184015260208101905062000173565b50505050905090810190601f168015620001be5780820380516001836020036101000a031916815260200191505b50604052505050818160016000806301ffc9a760e01b7bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916815260200190815260200160002060006101000a81548160ff02191690831515021790555060016000806380ac58cd60e01b7bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916815260200190815260200160002060006101000a81548160ff0219169083151502179055506001600080635b5e139f60e01b7bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916815260200190815260200160002060006101000a81548160ff021916908315150217905550600160008063150b7a0260e01b7bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916815260200190815260200160002060006101000a81548160ff021916908315150217905550816002908051906020019062000323929190620003d9565b5080600190805190602001906200033c929190620003d9565b5033600560006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055505050600160008063780e9d6360e01b7bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916815260200190815260200160002060006101000a81548160ff021916908315150217905550505062000488565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f106200041c57805160ff19168380011785556200044d565b828001600101855582156200044d579182015b828111156200044c5782518255916020019190600101906200042f565b5b5090506200045c919062000460565b5090565b6200048591905b808211156200048157600081600090555060010162000467565b5090565b90565b613be580620004986000396000f3fe60806040526004361061012a5760003560e01c80634f6ccce7116100ab57806395d89b411161006f57806395d89b41146107af578063a22cb4651461083f578063b88d4fde1461089c578063c87b56dd1461096c578063d0def52114610a20578063e985e9c514610acd5761012a565b80634f6ccce7146105f457806351cff8d9146106435780636352211e1461069457806369fe0e2d1461070f57806370a082311461074a5761012a565b806318160ddd116100f257806318160ddd1461042957806323b872dd146104545780632f745c59146104cf57806342842e0e1461053e57806342966c68146105b95761012a565b806301ffc9a71461012f57806306fdde03146101a1578063081812fc14610231578063095ea7b3146102ac578063150b7a0214610307575b600080fd5b34801561013b57600080fd5b506101876004803603602081101561015257600080fd5b8101908080357bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19169060200190929190505050610b56565b604051808215151515815260200191505060405180910390f35b3480156101ad57600080fd5b506101b6610bbd565b6040518080602001828103825283818151815260200191508051906020019080838360005b838110156101f65780820151818401526020810190506101db565b50505050905090810190601f1680156102235780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b34801561023d57600080fd5b5061026a6004803603602081101561025457600080fd5b8101908080359060200190929190505050610c5f565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b3480156102b857600080fd5b50610305600480360360408110156102cf57600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff16906020019092919080359060200190929190505050610ddf565b005b34801561031357600080fd5b506103d56004803603608081101561032a57600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803590602001909291908035906020019064010000000081111561039157600080fd5b8201836020820111156103a357600080fd5b803590602001918460018302840111640100000000831117156103c557600080fd5b90919293919293905050506112f1565b60405180827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19167bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916815260200191505060405180910390f35b34801561043557600080fd5b5061043e611306565b6040518082815260200191505060405180910390f35b34801561046057600080fd5b506104cd6004803603606081101561047757600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803573ffffffffffffffffffffffffffffffffffffffff16906020019092919080359060200190929190505050611313565b005b3480156104db57600080fd5b50610528600480360360408110156104f257600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803590602001909291905050506118f9565b6040518082815260200191505060405180910390f35b34801561054a57600080fd5b506105b76004803603606081101561056157600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803573ffffffffffffffffffffffffffffffffffffffff16906020019092919080359060200190929190505050611a7a565b005b3480156105c557600080fd5b506105f2600480360360208110156105dc57600080fd5b8101908080359060200190929190505050611a9a565b005b34801561060057600080fd5b5061062d6004803603602081101561061757600080fd5b8101908080359060200190929190505050611aa6565b6040518082815260200191505060405180910390f35b34801561064f57600080fd5b506106926004803603602081101561066657600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050611bac565b005b3480156106a057600080fd5b506106cd600480360360208110156106b757600080fd5b8101908080359060200190929190505050611cb9565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b34801561071b57600080fd5b506107486004803603602081101561073257600080fd5b8101908080359060200190929190505050611e04565b005b34801561075657600080fd5b506107996004803603602081101561076d57600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050611e0e565b6040518082815260200191505060405180910390f35b3480156107bb57600080fd5b506107c4611f2d565b6040518080602001828103825283818151815260200191508051906020019080838360005b838110156108045780820151818401526020810190506107e9565b50505050905090810190601f1680156108315780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b34801561084b57600080fd5b5061089a6004803603604081101561086257600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803515159060200190929190505050611fcf565b005b3480156108a857600080fd5b5061096a600480360360808110156108bf57600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803590602001909291908035906020019064010000000081111561092657600080fd5b82018360208201111561093857600080fd5b8035906020019184600183028401116401000000008311171561095a57600080fd5b90919293919293905050506120d0565b005b34801561097857600080fd5b506109a56004803603602081101561098f57600080fd5b8101908080359060200190929190505050612127565b6040518080602001828103825283818151815260200191508051906020019080838360005b838110156109e55780820151818401526020810190506109ca565b50505050905090810190601f168015610a125780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b610ab760048036036040811015610a3657600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff16906020019092919080359060200190640100000000811115610a7357600080fd5b820183602082011115610a8557600080fd5b80359060200191846001830284011164010000000083111715610aa757600080fd5b90919293919293905050506121dc565b6040518082815260200191505060405180910390f35b348015610ad957600080fd5b50610b3c60048036036040811015610af057600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050612235565b604051808215151515815260200191505060405180910390f35b6000806000837bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19167bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916815260200190815260200160002060009054906101000a900460ff169050919050565b606060028054600181600116156101000203166002900480601f016020809104026020016040519081016040528092919081815260200182805460018160011615610100020316600290048015610c555780601f10610c2a57610100808354040283529160200191610c55565b820191906000526020600020905b815481529060010190602001808311610c3857829003601f168201915b5050505050905090565b600081600073ffffffffffffffffffffffffffffffffffffffff166009600083815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1614156040518060400160405280600681526020017f303033303032000000000000000000000000000000000000000000000000000081525090610da2576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825283818151815260200191508051906020019080838360005b83811015610d67578082015181840152602081019050610d4c565b50505050905090810190601f168015610d945780820380516001836020036101000a031916815260200191505b509250505060405180910390fd5b50600c600084815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16915050919050565b8060006009600083815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1690503373ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff161480610ed85750600d60008273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff165b6040518060400160405280600681526020017f303033303033000000000000000000000000000000000000000000000000000081525090610fb4576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825283818151815260200191508051906020019080838360005b83811015610f79578082015181840152602081019050610f5e565b50505050905090810190601f168015610fa65780820380516001836020036101000a031916815260200191505b509250505060405180910390fd5b5082600073ffffffffffffffffffffffffffffffffffffffff166009600083815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1614156040518060400160405280600681526020017f3030333030320000000000000000000000000000000000000000000000000000815250906110f6576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825283818151815260200191508051906020019080838360005b838110156110bb5780820151818401526020810190506110a0565b50505050905090810190601f1680156110e85780820380516001836020036101000a031916815260200191505b509250505060405180910390fd5b5060006009600086815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1690508073ffffffffffffffffffffffffffffffffffffffff168673ffffffffffffffffffffffffffffffffffffffff1614156040518060400160405280600681526020017f30303330303800000000000000000000000000000000000000000000000000008152509061123b576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825283818151815260200191508051906020019080838360005b838110156112005780820151818401526020810190506111e5565b50505050905090810190601f16801561122d5780820380516001836020036101000a031916815260200191505b509250505060405180910390fd5b5085600c600087815260200190815260200160002060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550848673ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92560405160405180910390a4505050505050565b600063150b7a0260e01b905095945050505050565b6000600480549050905090565b8060006009600083815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1690503373ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1614806113e457503373ffffffffffffffffffffffffffffffffffffffff16600c600084815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16145b806114755750600d60008273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff165b6040518060400160405280600681526020017f303033303034000000000000000000000000000000000000000000000000000081525090611551576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825283818151815260200191508051906020019080838360005b838110156115165780820151818401526020810190506114fb565b50505050905090810190601f1680156115435780820380516001836020036101000a031916815260200191505b509250505060405180910390fd5b5082600073ffffffffffffffffffffffffffffffffffffffff166009600083815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1614156040518060400160405280600681526020017f303033303032000000000000000000000000000000000000000000000000000081525090611693576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825283818151815260200191508051906020019080838360005b8381101561165857808201518184015260208101905061163d565b50505050905090810190601f1680156116855780820380516001836020036101000a031916815260200191505b509250505060405180910390fd5b5060006009600086815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1690508673ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff16146040518060400160405280600681526020017f3030333030370000000000000000000000000000000000000000000000000000815250906117d7576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825283818151815260200191508051906020019080838360005b8381101561179c578082015181840152602081019050611781565b50505050905090810190601f1680156117c95780820380516001836020036101000a031916815260200191505b509250505060405180910390fd5b50600073ffffffffffffffffffffffffffffffffffffffff168673ffffffffffffffffffffffffffffffffffffffff1614156040518060400160405280600681526020017f3030333030310000000000000000000000000000000000000000000000000000815250906118e5576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825283818151815260200191508051906020019080838360005b838110156118aa57808201518184015260208101905061188f565b50505050905090810190601f1680156118d75780820380516001836020036101000a031916815260200191505b509250505060405180910390fd5b506118f086866122c9565b50505050505050565b6000600a60008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000208054905082106040518060400160405280600681526020017f303035303037000000000000000000000000000000000000000000000000000081525090611a1c576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825283818151815260200191508051906020019080838360005b838110156119e15780820151818401526020810190506119c6565b50505050905090810190601f168015611a0e5780820380516001836020036101000a031916815260200191505b509250505060405180910390fd5b50600a60008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000208281548110611a6757fe5b9060005260206000200154905092915050565b611a958383836040518060200160405280600081525061237e565b505050565b611aa381612c17565b50565b600060048054905082106040518060400160405280600681526020017f303035303037000000000000000000000000000000000000000000000000000081525090611b8c576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825283818151815260200191508051906020019080838360005b83811015611b51578082015181840152602081019050611b36565b50505050905090810190601f168015611b7e5780820380516001836020036101000a031916815260200191505b509250505060405180910390fd5b5060048281548110611b9a57fe5b90600052602060002001549050919050565b600560009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614611c6f576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260168152602001807f73686f756c6420626520726f6f74206163636f756e740000000000000000000081525060200191505060405180910390fd5b8073ffffffffffffffffffffffffffffffffffffffff166108fc479081150290604051600060405180830381858888f19350505050158015611cb5573d6000803e3d6000fd5b5050565b60006009600083815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1614156040518060400160405280600681526020017f303033303032000000000000000000000000000000000000000000000000000081525090611dfe576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825283818151815260200191508051906020019080838360005b83811015611dc3578082015181840152602081019050611da8565b50505050905090810190601f168015611df05780820380516001836020036101000a031916815260200191505b509250505060405180910390fd5b50919050565b8060068190555050565b60008073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff1614156040518060400160405280600681526020017f303033303031000000000000000000000000000000000000000000000000000081525090611f1c576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825283818151815260200191508051906020019080838360005b83811015611ee1578082015181840152602081019050611ec6565b50505050905090810190601f168015611f0e5780820380516001836020036101000a031916815260200191505b509250505060405180910390fd5b50611f2682612f06565b9050919050565b606060018054600181600116156101000203166002900480601f016020809104026020016040519081016040528092919081815260200182805460018160011615610100020316600290048015611fc55780601f10611f9a57610100808354040283529160200191611fc5565b820191906000526020600020905b815481529060010190602001808311611fa857829003601f168201915b5050505050905090565b80600d60003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff0219169083151502179055508173ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167f17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c3183604051808215151515815260200191505060405180910390a35050565b61212085858585858080601f016020809104026020016040519081016040528093929190818152602001838380828437600081840152601f19601f8201169050808301925050505050505061237e565b5050505050565b6060600860008381526020019081526020016000208054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156121d05780601f106121a5576101008083540402835291602001916121d0565b820191906000526020600020905b8154815290600101906020018083116121b357829003601f168201915b50505050509050919050565b600061222c8484848080601f016020809104026020016040519081016040528093929190818152602001838380828437600081840152601f19601f82011690508083019250505050505050612f52565b90509392505050565b6000600d60008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff16905092915050565b60006009600083815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905061230a82613300565b61231481836133a1565b61231e83836136af565b818373ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef60405160405180910390a4505050565b8160006009600083815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1690503373ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff16148061244f57503373ffffffffffffffffffffffffffffffffffffffff16600c600084815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16145b806124e05750600d60008273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff165b6040518060400160405280600681526020017f3030333030340000000000000000000000000000000000000000000000000000815250906125bc576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825283818151815260200191508051906020019080838360005b83811015612581578082015181840152602081019050612566565b50505050905090810190601f1680156125ae5780820380516001836020036101000a031916815260200191505b509250505060405180910390fd5b5083600073ffffffffffffffffffffffffffffffffffffffff166009600083815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1614156040518060400160405280600681526020017f3030333030320000000000000000000000000000000000000000000000000000815250906126fe576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825283818151815260200191508051906020019080838360005b838110156126c35780820151818401526020810190506126a8565b50505050905090810190601f1680156126f05780820380516001836020036101000a031916815260200191505b509250505060405180910390fd5b5060006009600087815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1690508773ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff16146040518060400160405280600681526020017f303033303037000000000000000000000000000000000000000000000000000081525090612842576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825283818151815260200191508051906020019080838360005b838110156128075780820151818401526020810190506127ec565b50505050905090810190601f1680156128345780820380516001836020036101000a031916815260200191505b509250505060405180910390fd5b50600073ffffffffffffffffffffffffffffffffffffffff168773ffffffffffffffffffffffffffffffffffffffff1614156040518060400160405280600681526020017f303033303031000000000000000000000000000000000000000000000000000081525090612950576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825283818151815260200191508051906020019080838360005b838110156129155780820151818401526020810190506128fa565b50505050905090810190601f1680156129425780820380516001836020036101000a031916815260200191505b509250505060405180910390fd5b5061295b87876122c9565b61297a8773ffffffffffffffffffffffffffffffffffffffff16613908565b15612c0d5760008773ffffffffffffffffffffffffffffffffffffffff1663150b7a02338b8a8a6040518563ffffffff1660e01b8152600401808573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200183815260200180602001828103825283818151815260200191508051906020019080838360005b83811015612a5a578082015181840152602081019050612a3f565b50505050905090810190601f168015612a875780820380516001836020036101000a031916815260200191505b5095505050505050602060405180830381600087803b158015612aa957600080fd5b505af1158015612abd573d6000803e3d6000fd5b505050506040513d6020811015612ad357600080fd5b8101908080519060200190929190505050905063150b7a0260e01b7bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916817bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916146040518060400160405280600681526020017f303033303035000000000000000000000000000000000000000000000000000081525090612c0a576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825283818151815260200191508051906020019080838360005b83811015612bcf578082015181840152602081019050612bb4565b50505050905090810190601f168015612bfc5780820380516001836020036101000a031916815260200191505b509250505060405180910390fd5b50505b5050505050505050565b80600073ffffffffffffffffffffffffffffffffffffffff166009600083815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1614156040518060400160405280600681526020017f303033303032000000000000000000000000000000000000000000000000000081525090612d58576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825283818151815260200191508051906020019080838360005b83811015612d1d578082015181840152602081019050612d02565b50505050905090810190601f168015612d4a5780820380516001836020036101000a031916815260200191505b509250505060405180910390fd5b5060006009600084815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050612d9a83613300565b612da481846133a1565b82600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef60405160405180910390a460006008600085815260200190815260200160002080546001816001161561010002031660029004905014612e4f57600860008481526020019081526020016000206000612e4e9190613ac2565b5b60006007600085815260200190815260200160002054905060006001600480549050039050600060048281548110612e8357fe5b906000526020600020015490508060048481548110612e9e57fe5b90600052602060002001819055506004805480612eb757fe5b6001900381819060005260206000200160009055905582600760008381526020019081526020016000208190555060006007600088815260200190815260200160002081905550505050505050565b6000600a60008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020805490509050919050565b60008073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff1614156040518060400160405280600681526020017f303033303031000000000000000000000000000000000000000000000000000081525090613060576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825283818151815260200191508051906020019080838360005b8381101561302557808201518184015260208101905061300a565b50505050905090810190601f1680156130525780820380516001836020036101000a031916815260200191505b509250505060405180910390fd5b50610100825111156040518060400160405280600681526020017f303033303131000000000000000000000000000000000000000000000000000081525090613144576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825283818151815260200191508051906020019080838360005b838110156131095780820151818401526020810190506130ee565b50505050905090810190601f1680156131365780820380516001836020036101000a031916815260200191505b509250505060405180910390fd5b506006543410156040518060400160405280600681526020017f303033303132000000000000000000000000000000000000000000000000000081525090613227576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825283818151815260200191508051906020019080838360005b838110156131ec5780820151818401526020810190506131d1565b50505050905090810190601f1680156132195780820380516001836020036101000a031916815260200191505b509250505060405180910390fd5b5060006003600081548092919060010191905055905061324784826136af565b808473ffffffffffffffffffffffffffffffffffffffff16600073ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef60405160405180910390a46132ad8184613953565b600481908060018154018082558091505060019003906000526020600020016000909190919091505560016004805490500360076000838152602001908152602001600020819055508091505092915050565b600073ffffffffffffffffffffffffffffffffffffffff16600c600083815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff161461339e57600c600082815260200190815260200160002060006101000a81549073ffffffffffffffffffffffffffffffffffffffff02191690555b50565b8173ffffffffffffffffffffffffffffffffffffffff166009600083815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16146040518060400160405280600681526020017f3030333030370000000000000000000000000000000000000000000000000000815250906134df576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825283818151815260200191508051906020019080838360005b838110156134a4578082015181840152602081019050613489565b50505050905090810190601f1680156134d15780820380516001836020036101000a031916815260200191505b509250505060405180910390fd5b506009600082815260200190815260200160002060006101000a81549073ffffffffffffffffffffffffffffffffffffffff02191690556000600b600083815260200190815260200160002054905060006001600a60008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000208054905003905081811461364b576000600a60008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002082815481106135cb57fe5b9060005260206000200154905080600a60008773ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020848154811061362357fe5b906000526020600020018190555082600b600083815260200190815260200160002081905550505b600a60008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002080548061369357fe5b6001900381819060005260206000200160009055905550505050565b600073ffffffffffffffffffffffffffffffffffffffff166009600083815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16146040518060400160405280600681526020017f3030333030360000000000000000000000000000000000000000000000000000815250906137ee576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825283818151815260200191508051906020019080838360005b838110156137b3578082015181840152602081019050613798565b50505050905090810190601f1680156137e05780820380516001836020036101000a031916815260200191505b509250505060405180910390fd5b50816009600083815260200190815260200160002060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550600a60008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000208190806001815401808255809150506001900390600052602060002001600090919091909150556001600a60008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000208054905003600b6000838152602001908152602001600020819055505050565b60008060007fc5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a47060001b9050833f91506000801b821415801561394a5750808214155b92505050919050565b81600073ffffffffffffffffffffffffffffffffffffffff166009600083815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1614156040518060400160405280600681526020017f303033303032000000000000000000000000000000000000000000000000000081525090613a94576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825283818151815260200191508051906020019080838360005b83811015613a59578082015181840152602081019050613a3e565b50505050905090810190601f168015613a865780820380516001836020036101000a031916815260200191505b509250505060405180910390fd5b5081600860008581526020019081526020016000209080519060200190613abc929190613b0a565b50505050565b50805460018160011615610100020316600290046000825580601f10613ae85750613b07565b601f016020900490600052602060002090810190613b069190613b8a565b5b50565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f10613b4b57805160ff1916838001178555613b79565b82800160010185558215613b79579182015b82811115613b78578251825591602001919060010190613b5d565b5b509050613b869190613b8a565b5090565b613bac91905b80821115613ba8576000816000905550600101613b90565b5090565b9056fea26469706673582212202f1259835a464afc6124c40b4bd6acca9a0d5ff8fc6520965cadffc8a6a72fb164736f6c63430006000033"

