import { ethers, network } from "hardhat";
import { VoiceVaultFactory, VoiceVaultFactory__factory } from "../typechain-types";
const addresses = require("./address.json");

async function main() {

  const [owner, addr1] = await ethers.getSigners();
  console.log("Network = ",network.name);
  console.log("Owner address = ",owner.address);
  
  const VoiceVaultFactory:VoiceVaultFactory__factory = await ethers.getContractFactory("VoiceVaultFactory");
  const voiceVaultFactory:VoiceVaultFactory = await VoiceVaultFactory.attach(addresses[network.name].voiceVaultFactory);

  console.log("VoiceVaultFactory Address: ", voiceVaultFactory.address);

  //const tx = await aiVoiceNFTFactory.deployAIVoiceNFT(owner.address,"Trump","TrumpVoice","TRUMP", "url");
  const tx = await voiceVaultFactory.createVoiceVault("0x429b697b0Bc1491F298C997140B62760ad2B0E17", "bafybeihdwdcefgh4dqkjv67uzcmw7ojee6xedzdetojuzjevtenxquvyku", "Adam","ADAM", "https://green-vicarious-wildcat-394.mypinata.cloud/ipfs/bafkreih52un25x5afl4mbxp3nxpnglatrjdzyoufg7szugwfmi66zf5lau");
  console.log("Transaction Hash: ", tx.hash);
  await tx.wait();
  console.log("Voice Vault deployed successfully");
 
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
