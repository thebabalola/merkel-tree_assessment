const { MerkleTree } = require('merkletreejs');
const SHA256 = require('crypto-js/sha256');

const addresses = [
  "0xabcdefabcdefabcdefabcdefabcdefabcdefabcde",
  "0xabcdef123456789abcdef123456789abcdef1234",
  "0x789abcdef123456789abcdef123456789abcdef23",
  "0x123456789abcdef123456789abcdef123456789a",
  "0x456789abcdef123456789abcdef123456789abcdef"
];

const leafNodes = addresses.map(addr => SHA256(addr).toString());
const merkleTree = new MerkleTree(leafNodes, SHA256); //Hash addresses

const root = merkleTree.getRoot().toString('hex');
console.log("The Merkle-Root:", root); // Get merkle root

const addressToVerify = "0x789abcdef123456789abcdef123456789abcdef23";
const leafToVerify = SHA256(addressToVerify).toString();
const proof = merkleTree.getProof(leafToVerify); // Generates proof for specific address

const isValid = merkleTree.verify(proof, leafToVerify, root);
console.log(`Is this Address ${addressToVerify} a member of the tree?`, isValid); // Verify's the proof, if it exist or not

