pragma solidity ^0.4.11;

contract Faucet {
    address public owner;
    uint256 sendAmount;

    function Faucet() payable {
        owner = msg.sender;
        sendAmount = 1 ether;
    }

    function getBalance() returns (uint) {
         return this.balance;
    }

    function getWei() {
        msg.sender.transfer(sendAmount);
    }

    function sendWei(address toWhom) {
        toWhom.transfer(sendAmount);
    }

    function getSendAmount() returns (uint256) {
        return sendAmount;
    }

    function killMe() returns (bool) {
        require(msg.sender == owner);
        suicide(owner);
        return true;
    }

    function () payable {}
}
