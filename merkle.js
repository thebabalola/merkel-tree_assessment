const { MerkleTree } = require('merkletreejs');
const SHA256 = require('crypto-js/sha256');

const addresses = [
  "0x123456789abcdef123456789abcdef123456789a",
  "0xabcdef123456789abcdef123456789abcdef1234",
  "0x789abcdef123456789abcdef123456789abcdef12",
  "0x456789abcdef123456789abcdef123456789abcdef",
  "0xabcdefabcdefabcdefabcdefabcdefabcdefabcde"
];


const leafNodes = addresses.map(addr => SHA256(addr).toString());
const merkleTree = new MerkleTree(leafNodes, SHA256);


const root = merkleTree.getRoot().toString('hex');
console.log("Merkle Root:", root);

// Generates proof for specific address
const addressToVerify = "0x123456789abcdef123456789abcdef123456789a";
const leafToVerify = SHA256(addressToVerify).toString();
const proof = merkleTree.getProof(leafToVerify);


const isValid = merkleTree.verify(proof, leafToVerify, root);
console.log(`Is the address ${addressToVerify} part of the tree?`, isValid); // Verify's the proof

