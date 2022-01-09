const { ethers } = require("hardhat");
const { expect } = require("chai");

const FEE = "50000000000000000";

describe("Monkey", () => {
  beforeEach(async () => {
    const accounts = await ethers.getSigners();
    admin = accounts[0];
    user1 = accounts[1];

    Monkey = await ethers.getContractFactory("Monkey");
    monkey = await Monkey.deploy("MonkeyNFT", "MK");
  });

  describe("Deployment 1 : Check basic info", () => {
    //DO SOMETHING
  });
});
