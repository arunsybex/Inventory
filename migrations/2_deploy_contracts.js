//var ConvertLib = artifacts.require("./ConvertLib.sol");
//var MetaCoin = artifacts.require("./MetaCoin.sol");

var SafeMath =artifacts.require("./SafeMath.sol");
var Owned = artifacts.require("./owned.sol");
var BasicToken = artifacts.require("./BasicToken.sol");
var Inventory = artifacts.require("./Inventory.sol");


module.exports = function(deployer) {
  //deployer.deploy(ConvertLib);
  //deployer.link(ConvertLib, MetaCoin);
  //deployer.deploy(MetaCoin);
  deployer.deploy(SafeMath);
  deployer.deploy(Owned,{from:web3.eth.accounts[0]});
  deployer.link(SafeMath,BasicToken);
  deployer.deploy(BasicToken);
  deployer.link(Owned,BasicToken,Inventory);
  deployer.deploy(Inventory,{from:web3.eth.accounts[0]});

  
  
};
