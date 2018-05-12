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
var orid;
var productid;

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
            return meta.p_details(a,b.toUpperCase(),c.toUpperCase(),d,price,{from:account,gas:600000});
           
          }).then(function(result) {
              swal("Product Added Successfully ...!"); 
              location.reload();           
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
            return meta.order(a,b,d,{from:account,value:web3.toWei(e,"ether"),gas:600000});
            
          }).then(function(result) {
            swal("Order Successfully....");
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
            return meta.update_product(a,d,e,{from:account,gas:600000});
          }).then(function(result) {
                 swal("Product Updated Successfully...");  
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
                  var myDate = new Date( (result[5].toNumber()) *1000);
                  var a=(myDate.toLocaleString());
                 
                      if(result[6]==0)
                        {var or = result[6];
                        or ="order canceled";}
                        else
                        or ="order success";
                    $("#order_list").append('<tr><td>' +result[0]+'</td><td>'+ result[1] + '</td><td>' + result[2] +'</td><td>'+ result[3]+'</td><td>'+result[4]+'</td><td>'+a.split(',')[0]+'</td><td>'+or+'</td></tr>');
                                                       
                  })
                }
              }).catch(function(e) {
                 console.log(e);
                 });
              },
              checkAdmin :function(){
                var self=this;
                var meta;
                $("#nav-works").html('');
                $(".tab-content").html('');
                inventory.deployed().then(function(instance){
                  meta = instance;
                  return meta.owner();
              }).then(function(val){
                  if(val == account){
                    $("#nav-works").html('<ul class="nav nav-tabs">\
                    <li><a data-toggle="tab" href="#menu1"><font color="BLUE">Product </font></a></li>\
                    <li><a data-toggle="tab" href="#menu2"><font color="blue">Update Product</font></a></li>\
                    <li><a data-toggle="tab" href="#menu4"><font color="blue">View Customer order</font></a></li>\
                    <li><a data-toggle="tab" href="#menu5"><font color="blue">Stock Products</font></a></li>\
                    <li><a data-toggle="tab" href="#menu6"><font color="blue">Cancel Orders</font></a></li></ul>');

                    $(".tab-content").html('<div id="menu1" class="tab-pane fade"><input type="text" id="id1" class="aa" minlength="1" maxlength="4"   readonly required/><br><label for="name"  class="a"> NAME</label><br><input type="text" id="name1" class="aa" placeholder=" LAP" onKeyPress="return ValidateAlpha(event);" ><br><label for="brand"  class="a">BRAND</label><br><input type="text" id="brand1" class="aa" placeholder=" DELL" onKeyPress="return ValidateAlpha(event);" ><br><label for="quantity"  class="a">Quantity:</label><br><input type="text" id="quantity1"  class="aa"  minlength="1" maxlength="4" onkeypress="return isNumberKey(event)" ><br><label for="price"  class="a">Amount:</label><br><input type="text" id="price1"  class="aa"  minlength="1" maxlength="2"  onkeypress="return isNumberKey(event)" ><br><br><br><button type="button" class="btn" onclick="App.product()"><b style="color:black;">ADD</b></button><button type="button" class="btn" onclick="App.clear()"><b style="color:black;">CLEAR</b></button></div>\
                    <div id="menu2" class="tab-pane fade"><div class="sample"><label for="id"  class="a">Product Id:</label><br><td><input type="text" id="id"  class="aa"  minlength="1" maxlength="4" onkeypress="return isNumberKey(event)" ><br><label for="quantity"  class="a">Quantity:</label><br><input type="text" id="quantity"  class="aa" minlength="1" maxlength="4"  onkeypress="return isNumberKey(event)" ><br><label for="price"  class="a">Price:</label><br><input type="text" id="Price"  class="aa"  minlength="1" maxlength="2"  onkeypress="return isNumberKey(event)" ><br><br><br><button type="button" class="btn" onclick="App.purchase()"><b style="color:black;">UPDATE</b></button> <br></div><h2><b>Out Of Stock Product Details</b></h2><table class="table table-striped" ><thead> <tr><th>Product Id</th><th>Product Quantity</th><th>Product Price</th></tr></thead><tbody id="reg_list"></tbody></table></article></div>\
                    <div id="menu4" class="tab-pane fade"><table class="table table-striped" ><thead> <tr><th>Order Id</th><th>Customer Id</th><th>Product Id</th><th>Quantity</th><th>Price</th><th>Date</th><th>Status</th></tr></thead><tbody id="order_list"></tbody></table></div>\
                    <div id="menu5" class="tab-pane fade"><table class="table table-striped" ><thead> <tr><th>Product Id</th><th>Product Name</th><th>Product Brand</th><th>Product Quantity</th><th>Product Price</th><th>Date</th></tr></thead><tbody id="product_list"></tbody></table></div>\
                    <div id="menu6" class="tab-pane fade"><table class="table table-striped" ><thead> <tr><th>Cancel ID</th><th>Order Id</th><th>Product Id</th><th>Customer Id</th><th>Price</th><th>Date</th></tr></thead><tbody id="cancel_list"></tbody></table><h1><b>Return amount to order cancel customer</b></h1><label for="cancel_id"  class="a">Cancel ID:</label><br><input type="text" id="cancel_id"  class="aa"><br><label for="customer"  class="a">Customer Address:</label><br><input type="text" id="customer"  class="aa"><br><label for="ETHER"  class="a">Return Ether:</label><br><input type="text" id="ETHER"  class="aa"  minlength="1" maxlength="2"  onkeypress="return isNumberKey(event)" ><br><br><br><button type="button" class="btn" onclick="App.returnether()"><b style="color:black;">CREDIT</b></button> <br> </div>');
                  }
                  else{
                    $("#nav-works").html('<ul class="nav nav-tabs">\
                    <li><a data-toggle="tab" href="#menu8"><font color="blue">Customer Purchase</font></a></li>\
                    <li><a data-toggle="tab" href="#menu7"><font color="blue">Order Cancel</font></a></li></ul>');

                    $(".tab-content").html('<div id="menu8" class="tab-pane fade"><div class="design"><label for="ord id" class="y" >ORDER ID</label><br><input type="text" id="orid"  class="aa"  minlength="1" maxlength="4" onkeypress="return isNumberKey(event)" readonly><br><label for="pro id" class="y">PRODUCT ID</label><br><input type="text" id="id2"   class="aa" minlength="1" maxlength="4" onkeyup="return isNumberKey(event);"placeholder="e.g.,1" ><br><label for="quantity" class="y">Quantity:</label><br><input type="text" id="qnty"  class="aa" minlength="1" maxlength="4" onkeyup="return isNumberKey(event),App.proamount()" placeholder="e.g.,6" ><br><label for="ether" class="y">Amount:</label><br><input type="text" id="ether"  class="aa" minlength="1" maxlength="4" onkeypress="return isNumberKey(event)" readonly ><br><br><br><button type="button"  class="btn"   id="order" onclick="App.Cutomerorder()"><b style="color:black;">ORDER</b></button><button class="btn btn-info" onclick="App.refresh()"><b style="color:black;">REFRESH</b></button></div> <article><div class="inner-addon right-addon"><i class="glyphicon glyphicon-search"></i><input type="text" id="search"  class="form-control" onkeyup="App.serching()" placeholder="Search" /></div></article><article><table class="table table-striped" ><thead> <tr><th>Product Id</th><th>Product Name</th><th>Product Brand</th><th>Product Quantity</th><th>Product Price</th></tr></thead><tbody id="product_list2"></tbody></table></article><article class="order"><table class="table table-striped" ><thead> <tr><th>Order Id</th><th>Customer Id</th><th>Product Id</th><th>Quantity</th><th>Price</th><th>Date</th></tr></thead><tbody id="order_list1"></tbody></table></article></div>\
                    <div id="menu7" class="tab-pane fade"><div class="design"><h1><b>Order Cancel</b></h1><p style="color:blue">by within one hour</p><table class="table table-striped" ><thead> <tr><th>Order Id</th><th>Customer Id</th><th>Product Id</th><th>Quantity</th><th>Price</th><th>Date</th><th></th></tr></thead><tbody id="order_list2"></tbody></table></div>');
                  }

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
                
                   for(let i=1;i<=val.toNumber();i++){
                     meta.outOfStock(i).then(function(result,err){
                      console.log(result[0],result[1])
                      console.log(result[1].toNumber() == 0);
                      if(result[1].toNumber() == 0){
                        $("#reg_list").append('<tr><td>' +result[0].toNumber()+'</td><td>'+ result[1].toNumber() +'</td><td>'+result[2].toNumber()+'</td></tr>');
                      }
                      }).catch(function(err) {
                        console.log(err);
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
                 var myDate = new Date( (result[5].toNumber()) *1000);
                var a=(myDate.toLocaleString());
               document.getElementById('orid').value = parseInt(result[0])+1;
               console.log(parseInt(result[0] )+1);
                if((result[1]==account)&&result[6]==1)
                  $("#order_list1").append('<tr><td>' +result[0]+'</td><td>'+ result[1] + '</td><td>' + result[2] +'</td><td>'+ result[3]+'</td><td>'+result[4]+'</td><td>'+a.split(',')[1]+'</td></tr>');
                              
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
              Ordercancell : function(o_id,p_id){
                var self = this;
                var meta;
                inventory.deployed().then(function(instance){
                  meta = instance;
                  return meta.ordercancel(o_id,p_id,{from:account,gas:600000});
                }).then(function(result) {
                     swal("Your Ordered Cancelled");
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
                        if (result[1] != 0){
                            $("#cancel_list").append('<tr><td>'+i+'</td><td>' +result[0]+'</tdconsole.log(val[0][1]);><td>'+ result[1] +'</td><td>'+result[2]+'</td><td>'+result[3]+'</td><td>'+a.split(',')[0]+'</td></tr>');
                        }
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
                 var myDate = new Date( (result[5].toNumber()) *1000);
                var a=(myDate.toLocaleString());
               document.getElementById('orid').value = parseInt(result[0])+1;
               console.log(parseInt(result[0])+1);
               orid=result[0];
               productid=result[2];
                if((result[1]==account)&&(result[6]==1))
                  $("#order_list2").append('<tr><td>' +result[0]+'</td><td>'+ result[1] + '</td><td>' + result[2] +'</td><td>'+ result[3]+'</td><td>'+result[4]+'</td><td>'+a.split(',')[1]+'</td><td><button type="button" class="btn" id="cancel" onclick="App.Ordercancell('+result[0]+','+result[2]+')"><b style="color:black;"> CANCEL ORDER</b></button></td></tr>');
                              
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
                var cancel_id = parseInt(document.getElementById("cancel_id").value)
                         
                inventory.deployed().then(function(instance){
                  meta = instance;
                  return meta.returnether(a,cancel_id,{from:account,value:web3.toWei(d,"ether"),gas:600000});
                  }).then(function(result) {
                       swal("Credited Successfully");
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