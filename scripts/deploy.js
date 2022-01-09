const { ethers } = require("hardhat");
const fs = require("fs");
require("dotenv").config();
const FEE = "50000000000000000";

async function main() {
  //Loading accounts
  // const accounts = await ethers.getSigners();
  // const addresses = accounts.map((item) => item.address.toString());

  // Loading contract factory.
  const Monkey = await ethers.getContractFactory("Monkey");

  // Deploy contracts
  const monkey = await Monkey.deploy("MonkeyNFT", "MK");
  await monkey.deployed();
  console.log("Mokey  deployed to ==> ", monkey.address);

  // Mint token
  await monkey.mintToken(
    "Monkey-NFT-1",
    "http://localhost:8080/ipfs/QmeCWsDX1rr1Zjs4N8evtqNWRt7VWRsJxWp2cHzfNmdT4x?filename=metadata_monkey_1.json",
    { value: FEE }
  );

  // set tokenUri
  // console.log("Let's set the tokenURI of your MemberCard");
  // await monkey.setTokenURI(1, "http://localhost:8080/ipfs/QmeCWsDX1rr1Zjs4N8evtqNWRt7VWRsJxWp2cHzfNmdT4x?filename=metadata_monkey_1.json")
  // const mk2 = await memberCard.setTokenURI(2, "https://ipfs.io/ipfs/QmXd61Wuj4mhNKHtdKgseZkcTzaTSSbBxYN5F7aaFEpCqx?filename=member-sliver.json")

  const contractAddresses = {
    monkey: monkey.address,
  };

  await fs.writeFileSync(
    "scripts/contracts.json",
    JSON.stringify(contractAddresses)
  );
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
