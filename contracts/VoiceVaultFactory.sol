// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;
import "@openzeppelin/contracts/utils/Strings.sol";
import {ReentrancyGuard} from "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./VoiceVault.sol";


contract VoiceVaultFactory is Ownable{
    event VoiceVaultCreated(address _contractAddress, address _owner, string _name, string _symbol);
    
    address public manager = address(0x07C920eA4A1aa50c8bE40c910d7c4981D135272B);

    // user address => VoiceVault contract address
    mapping(address => address) public voiceVaults;

    // VoiceVault contract address => CID
    mapping(address => string) public cidByVoiceVaults;

    modifier onlyOwnerOrManager() {
        require((owner() == msg.sender) || (manager == msg.sender), "Caller needs to be Owner or Manager");
        _;
    }

    constructor(address initialOwner) Ownable(initialOwner){
    }

    function createVoiceVault(address initialOwner, string memory _cid, string memory _name, 
        string memory _symbol, string memory _baseUri) external returns (address) {

        VoiceVault nft = new VoiceVault(initialOwner, _cid, _name, _symbol, _baseUri);
        voiceVaults[initialOwner] = address(nft);
        cidByVoiceVaults[address(nft)] = _cid;
        emit VoiceVaultCreated(address(nft), msg.sender, _name, _symbol);
        return address(nft);
    }

    function setManager(address _manager) public onlyOwnerOrManager {
        manager = _manager;
    }
}