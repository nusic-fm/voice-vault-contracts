import { ethers, network } from "hardhat";
import { VoiceVaultFactory, VoiceVaultFactory__factory } from "../typechain-types";
async function main() {

  const [owner, addr1] = await ethers.getSigners();
  console.log("Network = ",network.name);
  console.log("Owner address = ",owner.address);
  
  const VoiceVaultFactory:VoiceVaultFactory__factory = await ethers.getContractFactory("VoiceVaultFactory");
  const voiceVaultFactory:VoiceVaultFactory = await VoiceVaultFactory.deploy(owner.address);
  await voiceVaultFactory.deployed();
  console.log("VoiceVaultFactory deployed to: ", voiceVaultFactory.address);

  
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
