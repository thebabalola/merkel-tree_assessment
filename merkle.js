const { MerkleTree } = require('merkletreejs');
const SHA256 = require('crypto-js/sha256');

// Step 1: List of addresses
const addresses = [
  "0x123456789abcdef123456789abcdef123456789a",
  "0xabcdef123456789abcdef123456789abcdef1234",
  "0x789abcdef123456789abcdef123456789abcdef12",
  "0x456789abcdef123456789abcdef123456789abcdef",
  "0xabcdefabcdefabcdefabcdefabcdefabcdefabcde"
];

// Step 2: Hash each address
const leafNodes = addresses.map(addr => SHA256(addr).toString());
const merkleTree = new MerkleTree(leafNodes, SHA256);

// Step 3: Get the Merkle Root
const root = merkleTree.getRoot().toString('hex');
console.log("Merkle Root:", root);

// Step 4: Generate a proof for a specific address
const addressToVerify = "0x123456789abcdef123456789abcdef123456789a";
const leafToVerify = SHA256(addressToVerify).toString();
const proof = merkleTree.getProof(leafToVerify);

// Step 5: Verify the proof
const isValid = merkleTree.verify(proof, leafToVerify, root);
console.log(`Is the address ${addressToVerify} part of the tree?`, isValid);

