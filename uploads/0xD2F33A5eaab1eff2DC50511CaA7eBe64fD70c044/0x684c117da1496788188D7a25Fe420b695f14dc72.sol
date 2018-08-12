pragma solidity ^0.4.17;

contract Solution {
    string public message;

    function Solution(string initialMessage) public {
        message = initialMessage;
    }
    
    function setMessage(string newMessage) public {
        message = newMessage;
    }
}
