require('babel-register')

//var HDWalletProvider = require("truffle-hdwallet-provider");
//var mnemonic = "logic advice economy orbit gate snack crush cargo naive crawl destroy inherit";
module.exports = {
  networks: {
    development: {
      host: '127.0.0.1',
      port: 8545,
      network_id: '*' // Match any network id
    },
  //   ropsten: {
  //     provider: function() {
  //       return new HDWalletProvider(mnemonic, "https://ropsten.infura.io/Vr1GWcLG0XzcdrZHWMPu")
  //     },
  //     network_id: 3,
  //     //from:"0xCb5a2170113081c32C643662ED23618CC696A3C5",
  //     gas:"4000000"
  //   }
   }
}