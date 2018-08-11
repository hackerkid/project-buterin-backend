pragma solidity ^0.4.17;


contract onlineJudge {
    address[] public deployedQuestions;
    address public owner ;
    
    function onlineJudge() public {
        owner = msg.sender;
    }
    
    function createQuestion(string title, string description, string publicKey) public payable {
        address newQuestion = (new Question).value(msg.value)( msg.sender, title, description , publicKey, owner);
        deployedQuestions.push(newQuestion);
    }
    
    
    function getDeployedQuestions() public view returns(address[]) {
        return deployedQuestions;
    }
    
    function getBalance() public view returns(uint) {
        return this.balance;
    }
    
}

contract Question {
    address public manager;
    address public owner ;
    string public managerKey;
    string public questionTitle;
    string public questionDescription;

    struct Participant {
        string username;
        string solutionHash;
        uint gasUsed;
    }
    
    address[] public participants;
    mapping( address => bool) participantExists;
    mapping(address => Participant) addressToParticipant;

    
    function Question(address questionManager,  string title, string description,  string publicKey, address judgeOwner ) public payable  {
        owner = judgeOwner;
        manager = questionManager;
        managerKey = publicKey;
        questionDescription = description;
        questionTitle = title;
    }
    

    function submitSolutionDetails(address particpantAddress, string username, uint gasUsed, string ipfsHash) public {
        require(msg.sender == owner);
        Participant memory participant;

        if(participantExists[particpantAddress] ) {
            participant = addressToParticipant[particpantAddress];
        } else {
            participant = Participant({
                username: username,
                solutionHash: ipfsHash,
                gasUsed: gasUsed
            });
         }
         addressToParticipant[particpantAddress] = participant;
         participants.push(particpantAddress);
    }
    
    function rewardWinner(address participant) public {
        require(msg.sender == manager);
        participant.transfer(this.balance);
    }
    
    function getParticipantDetails(address participantAddress) public view returns(string, string, uint) {
        Participant participant = addressToParticipant[participantAddress];
        return (participant.username, participant.solutionHash, participant.gasUsed);
    }
    
    function getQuestionDescription() public view returns (string) {
        return questionDescription;
    }
    
    
    function getBalance() public view returns(uint) {
        return this.balance;
    }
    
  
    function getSummary() public view returns(address, string, string, uint, uint, string) {
        return (
            manager ,
            questionTitle,
            questionDescription,
            this.balance,
            participants.length ,
            managerKey
            ) ;
        
    }
    
}