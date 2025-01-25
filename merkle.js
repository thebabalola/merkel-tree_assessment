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
const merkleTree = new MerkleTree(leafNodes, SHA256); //Hash addresses


const root = merkleTree.getRoot().toString('hex');
console.log("Merkle Root:", root); // Get merkle root


const addressToVerify = "0x789abcdef123456789abcdef123456789abcdef12";
const leafToVerify = SHA256(addressToVerify).toString();
const proof = merkleTree.getProof(leafToVerify); // Generates proof for specific address


const isValid = merkleTree.verify(proof, leafToVerify, root);
console.log(`This Address ${addressToVerify} is part of the tree?`, isValid); // Verify's the proof, if it exist or not

