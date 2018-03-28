pragma solidity ^0.4.0;

import "./owned.sol";
import "./BasicToken.sol";

 
contract Inventory is owned,BasicToken{
     address owner;
    
     
    struct customer{
        uint c_id;
        bytes32 c_name;
        bytes32 c_address;
        bytes32 E_mail;
        uint c_phone;
        uint[] cid;
            }
    
    
    struct product{
        uint  pid;
        bytes32 pname;
        bytes32 pbrand;
        uint pquantity;
        uint pprice;
        bytes32[] brand;
        uint[] quantity;
        uint[] price;
            }
     
    
       
        struct productorder{
             uint id;
             uint cid;
             bytes32 name;
             bytes32 brand;
             uint quantity;
             bytes32[] bname;
             bytes32[] bbrand;
             uint[] bquantity;
             
              }
        
       
        
        struct in_order{
            uint ipid;
            bytes32 ipname;
            bytes32 brands;
            uint iquantity;
            uint iprice;
            uint itprice;
            bytes32[] iname;
            bytes32[] brandname;
            uint[] quantity;
            uint[] price;
              }
      
      
           
            
    mapping(uint=>customer)public CUST;
    mapping(uint=>product)public PROD;
    mapping(uint=>productorder)public ORDER;
    mapping(uint=>in_order)public PURCHASE;
    
    function invenmng()public{
        owner=msg.sender;
    }
     
    function c_details(uint id,bytes32 name,bytes32 caaddress,bytes32 mail,uint phone)public returns(uint[],bytes32,bytes32,bytes32,uint){
        CUST[id].c_id =id;
        CUST[id].c_name = name;
        CUST[id].c_address = caaddress;
        CUST[id].E_mail = mail;
        CUST[id].c_phone = phone;
        CUST[id].cid .push(id);
        
        return (CUST[id].cid,CUST[id].c_name, CUST[id].c_address,CUST[id].E_mail,CUST[id].c_phone);
           }
    
    function p_details(uint id,bytes32 name,bytes32 brand,uint quantity,uint price)public onlyOwner returns(uint,bytes32,bytes32[],uint[],uint[]) {
     
        PROD[id].pid = id;
        PROD[id].pname = name;
        PROD[id].pbrand = brand;
        PROD[id].pquantity = quantity;
        PROD[id].pprice = price;
        PROD[id].brand.push(brand); 
        PROD[id].quantity.push(quantity);
        PROD[id]. price.push(price);
        return ( PROD[id].pid,PROD[id].pname,PROD[id].brand,  PROD[id].quantity,PROD[id]. price );
        
    }  
   
   
    function order(uint id,uint id1,bytes32 name,bytes32 brand,uint quantity)public returns(uint,uint,bytes32[],bytes32[],uint[]) {
           require(id ==PROD[id].pid && quantity <= quantity);
           require( brand ==  PROD[id].pbrand && name ==  PROD[id].pname);
        
           ORDER[id].cid = id1;
           ORDER[id].id=id;
           ORDER[id].name = name;
           ORDER[id].brand = brand;
           ORDER[id].quantity=quantity;
           PROD[id].pquantity-=quantity;
           ORDER[id]. bname.push(name);
           ORDER[id].bbrand.push(brand);
           ORDER[id]. bquantity.push( quantity);
           
         return (ORDER[id].id,ORDER[id].cid, ORDER[id]. bname, ORDER[id].bbrand,ORDER[id]. bquantity);
     
     
    }
     
   
    function purchase_order(uint id,bytes32 p_name,bytes32 brands,uint _quantity,uint price)public onlyOwner returns(uint,bytes32[],bytes32[],uint[],uint[]) {
       PURCHASE[id].ipid = id;
       PURCHASE[id].ipname = p_name;
       PURCHASE[id].brands =brands;
       PURCHASE[id].iquantity = _quantity;
       PURCHASE[id].iprice = price;
       PURCHASE[id].itprice = _quantity * price;
       PURCHASE[id].iname.push( p_name);
       PURCHASE[id].brandname.push(brands);
       PURCHASE[id].quantity.push( _quantity);
       PURCHASE[id].price.push(price);
       totalSupply -= PURCHASE[id].itprice;
       return ( PURCHASE[id].ipid, PURCHASE[id].iname,PURCHASE[id].brandname, PURCHASE[id].quantity,PURCHASE[id].price);
       }
       
       function addproducts(uint id,bytes32 name,bytes32 brandname,uint quantity)public{
           if( PROD[id].pquantity <=15 && quantity <=PURCHASE[id].iquantity){
           if(name == PROD[id].pname && brandname == PROD[id].pbrand ){
               
               PROD[id].pquantity += quantity;
               PURCHASE[id].iquantity -= quantity;
           }
       }
}
       
    
    
    }