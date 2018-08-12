const HDWalletProvider = require('truffle-hdwallet-provider')
const Web3 = require('web3')
const questionInterface = require('./build/Question.json')
const judgeInterface = require('./build/onlineJudge.json')
const fs = require("fs")
var ganache = require("ganache-cli");

/*
const provider = new HDWalletProvider(
    'clock accident inflict print fantasy cook push dust boy injury sense mixture',
    'https://rinkeby.infura.io/v3/cb8a853ebeeb4a879d63af88929fbf9e'
  );

  */
  
const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));

add_solution = async () => {
    const accounts = await web3.eth.getAccounts();
    var data = fs.readFileSync(process.env["gas_used_file"]);
    const gas_used = data.toString();
    console.log(gas_used);
    console.log("accounts 0 " + accounts[0])
    console.log("question id " + process.env["question_id"])
    const judge = await new web3.eth.Contract(JSON.parse(judgeInterface.interface), '0xe78a0f7e598cc8b0bb87894b0f60dd2a88d6a8ab');
    const address_list = await judge.methods.getDeployedQuestions().call()
    console.log(address_list)
    await judge.methods.updateTokenCount(process.env["participant_id"]).send({from: accounts[0], gas: '2000000'});
    console.log("environ adrees " + process.env["question_id"])
    console.log(" adrees " + address_list[0])
    const question = await new web3.eth.Contract(JSON.parse(questionInterface.interface), process.env["question_id"]);
    const desc = await question.methods.submitSolutionDetails( process.env["participant_id"], process.env["username"], gas_used, "IPFS hash").send({from: accounts[0], gas: '2000000'});
   // console.log("leaderboard contract updated");
    return;
}

add_solution();
return;
