var web3=require('web3');
if(typeof web3 !== undefined) {
	web3 = new Web3(web3.currentProvider);
} else { 
web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
}
web3.eth.getCoinbase(function(err, coinbase){
	if(err){
		console.error(err);
		} else {
		console.log("coinbase:" + coinbase);
	}
});

var faucetAddress = "0xa2c70bf3ff60d33ffe90ceb0ee7f43418ca80aae";
var faucetContractFactory = web3.eth.contract(JSON.parse(faucetCompiled.contracts["Faucet.sol:Faucet"].abi));
var faucetInstance = faucetContractFactory.at(faucetAddress);

web3.eth.getBalance(faucetAddress, function(err,balance){
	if(err){
		console.error(err);
	} else {
		console.log("Contract Balance:"+ balance);
	}
});

faucetInstance.getBalance.call(function(err,balance){
	if(err){
		console.error(err);
	} else {
		console.log("Faucet Balance:"+balance);
	}
});
function topUp() {
	web3.eth.getCoinbase(function(err,coinbase){
		if(err){
			console.error(err);
		} else {
			web3.eth.sendTransaction({
			from:coinbase,
			to:faucetAddress,
			value:web3.toWei(1,"ether")
		}, function(err, txn){
			if(err){
				console.error(err);
			} else {
				console.log("topUp txn: "+ txn);
			}
		});
	}
 });
}

function sendWei() {
    web3.eth.getCoinbase(function(err, coinbase) {
        if (err) {
            console.error(err);
        } else {
            web3.eth.getAccounts(function(err, accounts) {
                if (err) {
                    console.error(err);
                } else {
                    var targetAccount = accounts[1];        
                    faucetInstance.sendWei(
                        targetAccount,
                        { from: coinbase },
                        function(err, txn) {
                            if (err) {
                                console.error(err);
                            } else {
                                console.log("sendWei txn: " + txn);
                            }
                        });
                }
            });
        }
    });
}
