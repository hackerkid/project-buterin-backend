const assert = require("assert");
const ganache = require("ganache-cli");
const Web3 = require("web3");
const provider = ganache.provider();
const web3 = new Web3(provider);

const path = require("path");
const fs = require("fs");
const solc = require("solc");

const solutionPath = path.resolve("uploads", process.env["question_id"], process.env["participant_id"] + ".sol")
const gasUsedPath = path.resolve("uploads", process.env["question_id"], process.env["participant_id"] + ".gas")
const source = fs.readFileSync(solutionPath, "utf-8")

const {interface, bytecode} = solc.compile(source, 1).contracts[":Solution"];

let accounts;
let solution;
let initial_balance;

beforeEach(async () => {
    accounts = await web3.eth.getAccounts();
    initial_balance = await web3.eth.getBalance(accounts[0]);

    solution = await new web3.eth.Contract(JSON.parse(interface))
      .deploy({data: bytecode, arguments: ["hi there"]})
      .send({from: accounts[0], gas: '1000000'})
    solution.setProvider(provider);
});


describe("Solution", async () => {

    it("deploys contract", async () => {
        assert.ok(solution.options.address)
    })

    it("has a default message", async () => {
        const message = await solution.methods.message().call({from: accounts[0]});
        assert.equal(message, "hi there");
    })

    it("can modiy the data", async () => {
        await solution.methods.setMessage("hello").send({from: accounts[0]});
        const message = await solution.methods.message().call({from: accounts[0]});
        assert.equal(message, "hello")
        console.log(accounts[0])

    })

    it("pass", async () => {
        const final_balance = await web3.eth.getBalance(accounts[0]);
        const gas_used = initial_balance - final_balance;

        fs.writeFile(gasUsedPath, gas_used, function(err) {
            if(err) {
                return console.log(err);
            }
            console.log("The file was saved!");
        });

    });

});
