import { ethers, network } from "hardhat";
import { RegisterVoiceVaultAsset, RegisterVoiceVaultAsset__factory } from "../typechain-types";
const addresses = require("./address.json");

async function main() {

  const [owner, addr1] = await ethers.getSigners();
  console.log("Network = ",network.name);
  console.log("Owner address = ",owner.address);
  
  const RegisterVoiceVaultAsset:RegisterVoiceVaultAsset__factory = await ethers.getContractFactory("RegisterVoiceVaultAsset");
  const registerVoiceVaultAsset:RegisterVoiceVaultAsset = await RegisterVoiceVaultAsset.deploy(
    "0x77319B4031e6eF1250907aa00018B8B1c67a244b",
    "0x04fbd8a2e56dd85CFD5500A4A4DfA955B9f1dE6f",
    "0x2E896b0b2Fdb7457499B56AAaA4AE55BCB4Cd316",
    "0xBe54FB168b3c982b7AaE60dB6CF75Bd8447b390E",
    "0x1514000000000000000000000000000000000000",
    //addresses[network.name].aiVoiceNFT
  );
  await registerVoiceVaultAsset.deployed();
  console.log("RegisterVoiceVaultAsset deployed to: ", registerVoiceVaultAsset.address);

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
