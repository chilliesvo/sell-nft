const { ethers } = require("hardhat");
const { expect } = require("chai");
const fs = require("fs");

const FEE = "50000000000000000";

describe("Monkey", () => {
  beforeEach(async () => {
    const accounts = await ethers.getSigners();
    admin = accounts[0];
    user1 = accounts[1];

    Monkey = await ethers.getContractFactory("MemberCard");
    monkey = await MemberCard.deploy("Member Card NFT", "MCN", 3, THREE_MONTHS);
  });

  describe("Deployment 1 : Check basic info", () => {});
});
