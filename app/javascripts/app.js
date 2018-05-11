import { default as Web3} from 'web3'
import { default as contract } from 'truffle-contract'
import Inventory from '../../build/contracts/Inventory.json'
var inventory = contract(Inventory);

var accounts;
var account;
var cus;
var productList;
var productCount;
var productId;
var price;
var search="";

window.App = {
  start: function() {
    var self = this;
    var r=11;     
    inventory.setProvider(web3.currentProvider);
      web3.eth.getAccounts(function(err, accs) {
      if (err != null) {
        alert("There was an error fetching your accounts.");
        return;
      }

      if (accs.length == 0) {
        alert("Couldn't get any accounts! Make sure your Ethereum client is configured correctly.");
        return;
      }
      accounts = accs;
      account = accounts[0];
      
      self.Vieworder();
      self.Custmerproduct();
      self.ViewProduct();
      self.outofstock();
      self.View();
      self.productid();
      self.Ordercancel_list();
      self. orderview();
    });
  },

  totalSupply: function(){
      var self = this;
      var meta;
      
      inventory.deployed().then(function(instance){
        meta = instance;
        return meta.totalSupply();
        
      }).then(function(re){
        console.log(re);
        document.getElementById("ts").value=re;
        }).catch(function(e){
        console.log(e);
      });
    },

    balance:function(){
      var self = this;
      var owner = document.getElementById("owner").value;
      var meta;
      inventory.deployed().then(function(instance){
        meta = instance;
        return meta.balanceOf(owner);
      }).then(function(result) {
          document.getElementById("ba").value=result;
        }).catch(function(e) {
         console.log(e);
           });
     },

     transfer:function(){
       var self = this;
       var meta;
       var toaddress =document.getElementById("toaddress").value;
       var value = parseInt(document.getElementById("value").value); 
             
       inventory.deployed().then(function(instance){
        meta = instance;
        return meta.transfer(toaddress,value,{from:account,gas:6000000});
      }).then(function(result) {
         var res=document.getElementById("ts").value = result;
         }).catch(function(e) {
         console.log(e);
         
       });
     },
      
   sendether:function(){
    
    var self = this;
    var ether= document.getElementById("ether").value;
    var meta;
    inventory.deployed().then(function(instance){
     meta = instance;
     return meta.sendEther({from:account,value:web3.toWei(ether,"ether"),gas:6000000});
   }).then(function(result) {       
     document.getElementById("ba").value=result;
         }).catch(function(e) {
      console.log(e);
      });
     },

      customer: function(){
      var self = this;
      var meta;
        
        inventory.deployed().then(function(instance){
          meta = instance;
          return meta.cust({from:account,gas:6000000});
        }).then(function(result) {
         alert("registered")
             
         }).catch(function(e) {
           console.log(e);
           });
       },  

       product: function(){
        var self = this;
        var meta;
        var a = parseInt(document.getElementById("id1").value);
        var b = document.getElementById("name1").value;
        var c = document.getElementById("brand1").value;
        var d = parseInt(document.getElementById("quantity1").value);
        var price = parseInt(document.getElementById("price1").value);

          inventory.deployed().then(function(instance){
            meta = instance;
            return meta.p_details(a,b.toUpperCase(),c.toUpperCase(),d,price,{from:account,gas:6000000});
           
          }).then(function(result) {
              console.log(result); 
           
           }).catch(function(e) {
             console.log(e);
           });
         },  
         
         Cutomerorder: function(){
          var self = this;
          var meta;
          var a = parseInt(document.getElementById("orid").value);
          var b = parseInt(document.getElementById("id2").value);
          var d = parseInt(document.getElementById("qnty").value);
          var e = parseInt(document.getElementById("ether").value);
                  
          inventory.deployed().then(function(instance){
            meta = instance;
            return meta.order(a,b,d,{from:account,value:web3.toWei(e,"ether"),gas:6000000});
            
          }).then(function(result) {
            alert("ordered");
            console.log(result);
            
          }).catch(function(e) {
             console.log(e);
      
           });
         },  
         
         purchase: function(){
          var self = this;
          var meta;
          var a = parseInt(document.getElementById("id").value);
          var d = parseInt(document.getElementById("quantity").value);
          var e = parseInt(document.getElementById("Price").value);
                   
          inventory.deployed().then(function(instance){
            meta = instance;
            return meta.update_product(a,d,e,{from:account,gas:6000000});
          }).then(function(result) {
            console.log(result);  
           }).catch(function(e) {
             console.log(e);
            
           });

         },
          ViewProduct :function(){
            var self = this;
            var meta;
            $("#product_list").html('')
            inventory.deployed().then(function(instance){
              meta = instance;
                return meta.getProductsCount();
              }).then(function(val) {
                console.log(val);
                for(let i=1;i<=val;i++){
                 meta.viewproduct(i).then(function(result){
                    var myDate = new Date( (result[5].toNumber()) *1000);
                    var a=(myDate.toLocaleString());
                   
                  
                    $("#product_list").append('<tr><td>' +result[0]+'</td><td>'+ result[1] + '</td><td>' + result[2] +'</td><td>'+ result[3]+'</td><td>'+result[4]+'</td><td>'+a.split(',')[0]+'</td></tr>');
                }).catch(function(e) {
                  
                });
              }
                    
             });
                  
                  
        },
        productid: function(){
          var self = this;
          var meta;
        
          inventory.deployed().then(function(instance){
            meta = instance;
              return meta.getProductsCount();
          }).then(function(val){
            
              document.getElementById('id1').value = parseInt(val)+1;
              console.log(parseInt(val)+1);
          }).catch(function(e){

          })
        },
           
        Vieworder :function(){
              var self = this;
              var meta;
             $("#order_list").html('')
              inventory.deployed().then(function(instance){
                meta = instance;
                return meta.getOrderCount();
              }).then(function(val) {
                for(let i=1;i<=val;i++){
                  meta.vieworder(i).then(function(result){
                  var myDate = new Date( (result[6].toNumber()) *1000);
                  var a=(myDate.toLocaleString());
                 
                      if(result[4]==0)
                        {var or = result[4];
                        or ="order canceled";}
                        else
                        or ="order success";
                    $("#order_list").append('<tr><td>' +result[0]+'</td><td>'+ result[1] + '</td><td>' + result[2] +'</td><td>'+ result[3]+'</td><td>'+result[4]+'</td><td>'+result[5]+'</td><td>'+a.split(',')[0]+'</td><td>'+or+'</td></tr>');
                                                       
                  })
                }
              }).catch(function(e) {
                 console.log(e);
                 });
              },
      
       outofstock :function(){
              var self=this;
              var meta;
              $("#reg_list").html('')
              inventory.deployed().then(function(instance){
                  meta = instance;
                  return meta.getProductsCount();
              }).then(function(val){
                  for(let i=1;i<=val;i++){
                    meta.outOfStock(i).then(function(result,err){
                    if(parseInt(result[1])==0)
                    $("#reg_list").append('<tr><td>' +result[0]+'</td><td>'+ result[1] +'</td></tr>');
                    }).catch(function(err) {
                    });
                  }
                })
            },
            

          proamount:function(){
            var self = this;
              var meta;
              var a = document.getElementById("id2").value;
              inventory.deployed().then(function(instance){
                meta = instance;
                return meta.view1(a);

              }).then(function(val){
                var azz=parseInt(val);
                console.log(parseInt(val));

            var az = document.getElementById("qnty").value;
            console.log(az*azz);

            document.getElementById("ether").value=az*azz;
          })
          },

          View :function(){
            var self = this;
            var meta;
            $("#order_list1").html('')
            inventory.deployed().then(function(instance){
              meta = instance;
              return meta.getOrderCount();
            }).then(function(val) {
              for(let i=0;i<=val;i++){
                meta.vieworder(i).then(function(result){
                 var myDate = new Date( (result[6].toNumber()) *1000);
                var a=(myDate.toLocaleString());
               document.getElementById('orid').value = parseInt(result[0])+1;
               console.log(parseInt(result[0])+1);
                if((result[1]==account)&&(result[4]!=0))
                  $("#order_list1").append('<tr><td>' +result[0]+'</td><td>'+ result[1] + '</td><td>' + result[2] +'</td><td>'+ result[3]+'</td><td>'+result[4]+'</td><td>'+result[5]+'</td><td>'+a.split(',')[1]+'</td></tr>');
                              
                }).catch(function(e) {
               
              });
              }
            })
            },
           

              Custmerproduct :function(){
                var self = this;
                var meta;
               // var s=document.getElementById('search').value;
                $("#product_list2").html('')
                inventory.deployed().then(function(instance){
                  meta = instance;
                    return meta.getProductsCount();
                  }).then(function(val) {
                    console.log(val);
                    for(let i=1;i<=val;i++){
                    meta.viewproduct(i).then(function(result){
                      if(result[1].includes(search.toUpperCase()))
                       $("#product_list2").append('<tr><td>' +result[0]+'</td><td>'+ result[1] + '</td><td>' + result[2] +'</td><td>'+ result[3]+'</td><td>'+result[4]+'</td></tr>');
                    })
                  }
                });
                },
                serching: function(){
                  search =document.getElementById("search").value;
                   this. Custmerproduct();
                   
               },
              Ordercancell : function(){
                var self = this;
                var meta;
                var a = parseInt(document.getElementById("od").value);
                var d = parseInt(document.getElementById("pd").value);
                         
                inventory.deployed().then(function(instance){
                  meta = instance;
                  return meta.ordercancel(a,d,{from:account,gas:6000000});
                }).then(function(result) {
                  alert("canceled");
                  }).catch(function(e) {
                   console.log(e);
                               
                 });
      
               },   
               Ordercancel_list :function(){
                var self=this;
                var meta;
                $("#cancel_list").html('')
                inventory.deployed().then(function(instance){
                    meta = instance;
                    return meta.getcancell_list();
                }).then(function(val){
                   for(let i=0;i<=val.length;i++){
                      meta. cancel_list(val[i]).then(function(result,err){
                        var myDate = new Date( (result[4].toNumber()) *1000);
                        var a=(myDate.toLocaleString());
                   $("#cancel_list").append('<tr><td>' +result[0]+'</tdconsole.log(val[0][1]);><td>'+ result[1] +'</td><td>'+result[2]+'</td><td>'+result[3]+'</td><td>'+'</td><td>'+a.split(',')[0]+'</td></tr>');
                    }).catch(function(e) {
                      }).catch(function(err) {
                      });
                    }
                  })
              },

          orderview :function(){
            var self = this;
            var meta;
            $("#order_list2").html('')
            inventory.deployed().then(function(instance){
              meta = instance;
              return meta.getOrderCount();
            }).then(function(val) {
              for(let i=0;i<=val;i++){
                meta.vieworder(i).then(function(result){
                 var myDate = new Date( (result[6].toNumber()) *1000);
                var a=(myDate.toLocaleString());
               document.getElementById('orid').value = parseInt(result[0])+1;
               console.log(parseInt(result[0])+1);
                if((result[1]==account)&&(result[4]!=0))
                  $("#order_list2").append('<tr><td>' +result[0]+'</td><td>'+ result[1] + '</td><td>' + result[2] +'</td><td>'+ result[3]+'</td><td>'+result[4]+'</td><td>'+result[5]+'</td><td>'+a.split(',')[1]+'</td></tr>');
                              
                }).catch(function(e) {
               
              });
              }
            })
            },
              
               

               returnether:function(){
                var self = this;
                var meta;
               var a = document.getElementById("customer").value;
                var d = parseInt(document.getElementById("ETHER").value);
                         
                inventory.deployed().then(function(instance){
                  meta = instance;
                  return meta.returnether(a,{from:account,value:web3.toWei(d,"ether"),gas:6000000});
                  }).then(function(result) {
                  console.log(result);  
                 }).catch(function(e) {
                   console.log(e);
                  
                 });
      
               },   

            refresh:function(){
              var self = this;
              self.View();
              document.getElementById("id2").value = "";
               document.getElementById("qnty").value = "";
              document.getElementById("ether").value = "";
            },

            clear:function(){
              var self = this;
              self.productid();
              document.getElementById("name1").value = "";
               document.getElementById("quantity1").value = "";
              document.getElementById("brand1").value = "";
              document.getElementById("price1").value = "";
            }  

      }, 
  
   window.addEventListener('load', function() {
  // Checking if Web3 has been injected by the browser (Mist/MetaMask)
  if (typeof web3 !== 'undefined') {
    console.warn("Using web3 detected from external source. If you find that your accounts don't appear or you have 0 MetaCoin, ensure you've configured that source properly. If using MetaMask, see the following link. Feel free to delete this warning. :) http://truffleframework.com/tutorials/truffle-and-metamask")
    // Use Mist/MetaMask's provider
    window.web3 = new Web3(web3.currentProvider);
  } else {
    console.warn("No web3 detected. Falling back to http://127.0.0.1:8080. You should remove this fallback when you deploy live, as it's inherently insecure. Consider switching to Metamask for development. More info here: http://truffleframework.com/tutorials/truffle-and-metamask");
    // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
    window.web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:8080"));
  }

  App.start();
});