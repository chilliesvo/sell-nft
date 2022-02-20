const { ethers } = require("hardhat");
const fs = require("fs");
require("dotenv").config();
const FEE = "50000000000000000";

async function main() {
  //Loading accounts
  const accounts = await ethers.getSigners();
  const addresses = accounts.map((item) => item.address.toString());

  // Loading contract factory.
  const Monkey = await ethers.getContractFactory("Monkey");

  // Deploy contracts
  const monkey = await Monkey.deploy("MonkeyNFT", "MK");
  await monkey.deployed();
  console.log("Mokey  deployed to ==> ", monkey.address);

  // Mint token
  await monkey.mintToken(
    "Monkey-Animation-1",
    "https://gateway.pinata.cloud/ipfs/QmeCWsDX1rr1Zjs4N8evtqNWRt7VWRsJxWp2cHzfNmdT4x?filename=metadata_monkey_1.json",
    { value: FEE }
  );

  await monkey.mintToken(
    "Monkey-Animation-2",
    "https://gateway.pinata.cloud/ipfs/QmbKjHBPfKoFXWZKAAqDoKyJsUhohEHP2PaZ2p8Z2EAzhD?filename=metadata_monkey_2.json",
    { value: FEE }
  );

  
  const contractAddresses = {
    monkey: monkey.address,
  };

  await fs.writeFileSync(
    "contracts.json",
    JSON.stringify(contractAddresses)
  );
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
