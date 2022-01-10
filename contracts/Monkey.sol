// SPDX-License-Identifier: MIT
pragma solidity 0.8.4;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Monkey is ERC721URIStorage, Ownable {
    struct Monkey {
        string name;
    }

    Monkey[] public monkeys;

    uint256 private currentTokenId;
    uint256 public fee;

    constructor(
        string memory name,
        string memory symbol
    ) ERC721(name, symbol) {
        fee = 5e16;
    }

    // function transferFrom(
    //     address from,
    //     address to,
    //     uint256 tokenId
    // ) public override {
    //     require(
    //         _isApprovedOrOwner(_msgSender(), tokenId),
    //         "ERC721: transfer caller is not owner nor approved"
    //     );
    //     _transfer(from, to, tokenId);
    // }

    function mintToken(string memory name, string memory metadataURI) external payable {
        require(msg.value >= fee, "Invalid value");
        monkeys.push(Monkey(name));
        _safeMint(msg.sender, ++currentTokenId);

        _setTokenURI(currentTokenId, metadataURI);

        payable(owner()).transfer(msg.value); // solhint-disable-line indent
    }

    function setTokenURI(uint256 tokenId, string memory tokenURI) public {
        _setTokenURI(tokenId, tokenURI);
    }

    function getTokenURI(uint256 tokenId) public view returns (string memory) {
        return tokenURI(tokenId);
    }
}
