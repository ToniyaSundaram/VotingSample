web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
abi = JSON.parse('[ { "inputs": [ { "name": "candidateNames", "type": "bytes32[]" } ], "payable": false, "stateMutability": "nonpayable", "type": "constructor" }, { "constant": false, "inputs": [ { "name": "candidateName", "type": "bytes32" } ], "name": "validCandidate", "outputs": [ { "name": "", "type": "bool" } ], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [ { "name": "_name", "type": "bytes32" } ], "name": "voterForCandidate", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [ { "name": "_name", "type": "bytes32" } ], "name": "votes", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" } ]')
VotingContract = web3.eth.contract(abi);


// In your nodejs console, execute contractInstance.address to get the address at which the contract is deployed and change the line below to use your deployed address
contractInstance = VotingContract.at('0x77169681ec95ac46162d88afd9e4ef42dd17d83a');
candidates = {"Fariz": "candidate-1", "Meenu": "candidate-2", "Sonu": "candidate-3"}


function voteForCandidate() {
  candidateName = $("#candidate").val();
  contractInstance.voterForCandidate(candidateName, {from: web3.eth.accounts[0]}, function() {
    let div_id = candidates[candidateName];
    $("#" + div_id).html(contractInstance.votes.call(candidateName).toString());
  });
}

$(document).ready(function() {
  candidateNames = Object.keys(candidates);
  for (var i = 0; i < candidateNames.length; i++) {
    let name = candidateNames[i];
    let val = contractInstance.votes.call(name).toString()
    $("#" + candidates[name]).html(val);
  }
});