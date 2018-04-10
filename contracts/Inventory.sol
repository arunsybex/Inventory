pragma solidity ^0.4.0;

import "./owned.sol";
import "./BasicToken.sol";

 
contract Inventory is owned,BasicToken{
     
    
     
   address public customer;
   uint256 public productCount=0;
   uint256[] public p_id;
   uint256[] public o_id;
    
    struct product{
        uint pid;
        string pname;
        string pbrand;
        uint pquantity;
        uint pprice;
       }
     
    
       
        struct productorder{
             uint id2;
             uint id;
             address cid;
             string name;
             string brand;
             uint quantity;
             uint price;
             uint tprice;
            }
        
       
        
        struct in_order{
            uint ipid;
            string ipname;
            string brands;
            uint iquantity;
            uint iprice;
            uint itprice;
           }
      
                          
    mapping(address=>address)public CUST;
    mapping(uint=>product)public PROD;
    mapping(uint=>productorder)public ORDER;
    mapping(uint=>in_order)public PURCHASE;
    
    
    function cust(address id)public returns(address){
        CUST[id]=id;
        return CUST[id];
    }
    
         
    function p_details(uint id,string name,string brand,uint quantity,uint price)public onlyOwner   {
     
        PROD[id].pid = id;
        PROD[id].pname = name;
        PROD[id].pbrand = brand;
        PROD[id].pquantity = quantity;
        PROD[id].pprice = price;
        productCount++;
        p_id.push(id);
        
        
    }  
   
   function getProductsCount() public view returns(uint256){
       return p_id.length;
   }

   function getProductId(uint _id) public view returns(uint256)
   {
       return p_id[_id];
   }

    function order(uint id2,uint id,address id1,uint pquantity)public  {
           require(id ==PROD[id].pid && pquantity <= PROD[id].pquantity);
           require(id1 == CUST[id1]);
           ORDER[id2].id2 = id2;
           ORDER[id2].cid = id1;
           ORDER[id2].id=id;
           ORDER[id2].name =PROD[id].pname ;
           ORDER[id2].brand =  PROD[id].pbrand;
           ORDER[id2].quantity=pquantity;
           ORDER[id2].price = pquantity *  PROD[id].pprice; 
           ORDER[id2].tprice += ORDER[id2].price ;
           PROD[id].pquantity-=pquantity;
           balances[msg.sender] -= ORDER[id2].tprice ;
           balances[owner] += ORDER[id2].tprice;
            o_id.push(id2);
           
          
    }

    function getOrderCount()public view returns(uint256){
        return o_id.length;
    }
     
   
    function purchase_order(uint id,string p_name,string brands,uint _quantity,uint price)public onlyOwner returns(uint,string,string,uint,uint) {
       PURCHASE[id].ipid = id;
       PURCHASE[id].ipname = p_name;
       PURCHASE[id].brands =brands;
       PURCHASE[id].iquantity = _quantity;
       PURCHASE[id].iprice = price;
       PURCHASE[id].itprice = _quantity * price;
       balances[owner] -= PURCHASE[id].itprice;

       return ( PURCHASE[id].ipid, PURCHASE[id].ipname,PURCHASE[id].brands, PURCHASE[id].iquantity,PURCHASE[id].iprice);
       }
       
       function addproducts(uint id,string name,string brandname,uint quantity)onlyOwner public{
           require(quantity <=PURCHASE[id].iquantity);
           require(keccak256(name) == keccak256(PROD[id].pname) && keccak256(brandname) == keccak256(PROD[id].pbrand) );
               
               PROD[id].pquantity += quantity;
               PURCHASE[id].iquantity -= quantity;
         }
         
       function viewproduct(uint id)public constant returns(uint,string,string,uint,uint){
           
           return(PROD[id].pid,PROD[id].pname,PROD[id].pbrand,  PROD[id].pquantity,PROD[id].pprice);
       } 
       
       function vieworder(uint id2)public constant returns(uint,address,string,string,uint,uint,uint){
           
           return (ORDER[id2].id,ORDER[id2].cid, ORDER[id2].name, ORDER[id2].brand,ORDER[id2].quantity,ORDER[id2].price,ORDER[id2].tprice);
       }
       
       
       function viewpurchase(uint id)public constant returns(uint,string,string,uint,uint){
           
           return( PURCHASE[id].ipid, PURCHASE[id].ipname,PURCHASE[id].brands, PURCHASE[id].iquantity,PURCHASE[id].iprice);
           
       }
         
         
    
}
   
     
