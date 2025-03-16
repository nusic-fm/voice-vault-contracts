import { ethers, network } from "hardhat";
import { RegisterVoiceVaultAsset, RegisterVoiceVaultAsset__factory } from "../typechain-types";
const addresses = require("./address.json");

async function main() {

  const [owner, addr1] = await ethers.getSigners();
  console.log("Network = ",network.name);

  const RegisterVoiceVaultAsset:RegisterVoiceVaultAsset__factory = await ethers.getContractFactory("RegisterVoiceVaultAsset");
  const registerVoiceVaultAsset:RegisterVoiceVaultAsset = await RegisterVoiceVaultAsset.attach(addresses[network.name].registerVoiceVaultAsset);

  console.log("RegisterVoiceVaultAsset Address:", registerVoiceVaultAsset.address);

  const txt1 = await registerVoiceVaultAsset.mintAndRegisterAndCreateTermsAndAttach(owner.address,"0xc3D409cd015f993540a7806949595cdba331f1f3");
  console.log("txt1.hash = ",txt1.hash);
  const receipt = await txt1.wait();
  console.log("receipt done");

  const filter = registerVoiceVaultAsset.filters.MintAndRegisterAndCreateTermsAndAttach();
  const events = await registerVoiceVaultAsset.queryFilter(filter);
  console.log("events = ",events);
  events.forEach((event) => {
    console.log("event.args = ",event.args);
  })

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
