const HDWalletProvider = require('truffle-hdwallet-provider')
const Web3 = require('web3')
const questionInterface = require('./build/Question.json')
const fs = require("fs")

const provider = new HDWalletProvider(
    'clock accident inflict print fantasy cook push dust boy injury sense mixture',
    'https://rinkeby.infura.io/v3/cb8a853ebeeb4a879d63af88929fbf9e'
  );
  
const web3 = new Web3(provider);

add_solution = async () => {
    const accounts = await web3.eth.getAccounts();
    var data = fs.readFileSync(process.env["gas_used_file"]);
    const gas_used = data.toString();
    console.log(gas_used);

    const question = await new web3.eth.Contract(JSON.parse(questionInterface.interface), process.env["question_id"]);
    const desc = await question.methods.submitSolutionDetails( process.env["participant_id"], process.env["username"], gas_used, "IPFS hash").send({from: accounts[0], gas: '500000'});
    return;
}

add_solution();
return;
