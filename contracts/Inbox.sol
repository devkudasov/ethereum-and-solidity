// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract Inbox {
    string private message;

    constructor(string memory initialMessage) public {
        message = initialMessage;
    }

    function setMessage(string memory newMwssage) public {
        message = newMwssage;
    }

    function getMessage() public view returns (string memory) {
        return message;
    }
}