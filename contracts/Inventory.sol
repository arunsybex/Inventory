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
        uint time;
       }

     
    
       
        struct productorder{
             uint id2;
             uint id;
             address cid;
             string name;
             string brand;
             uint quantity;
             uint price;
             uint time;
            }
        
       
        
        struct in_order{
            uint ipid;
            uint iquantity;
            uint iprice;
           }
      
                          
    mapping(address=>address)public CUST;
    mapping(uint=>product)public PROD;
    mapping(uint=>productorder)public ORDER;
    mapping(uint=>in_order)public UPDATE;
    
    function view1(uint id)public constant returns(uint){
         return (PROD[id].pprice);
     }
    
    
    function cust()public returns(address) {
        CUST[msg.sender] = msg.sender;
        return CUST[msg.sender];
    }
    
         
    function p_details(uint id,string name,string brand,uint quantity,uint price)public  payable onlyOwner   {
        require(PROD[id].pid!=id);
        PROD[id].pid = id;
        PROD[id].pname = name;
        PROD[id].pbrand = brand;
        PROD[id].pquantity = quantity;
        PROD[id].pprice = price;
        PROD[id].time = now;
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

    function order(uint id2,uint id,uint pquantity)public payable {
        
           require(id ==PROD[id].pid && pquantity <= PROD[id].pquantity);
           require(msg.sender==CUST[msg.sender] );
           ORDER[id2].id2 = id2;
           ORDER[id2].cid = msg.sender;
           ORDER[id2].id=id;
           ORDER[id2].name =PROD[id].pname ;
           ORDER[id2].brand =  PROD[id].pbrand;
           ORDER[id2].quantity=pquantity;
           ORDER[id2].price = pquantity *  PROD[id].pprice; 
           ORDER[id2].time = now;
           PROD[id].pquantity-=pquantity;
           
           owner.transfer(msg.value);

           o_id.push(id2);
           
    }
    
    function getOrderCount()public view returns(uint256){
        return o_id.length;
    }
     
   
    function update_product(uint id,uint _quantity,uint price)public onlyOwner  {
       
       UPDATE[id].ipid = id;
       UPDATE[id].iquantity = _quantity;
       UPDATE[id].iprice = price;
       PROD[id].pquantity+=_quantity;
        PROD[id].pprice= price;
       

       }
      
         
       function viewproduct(uint id)public constant returns(uint,string,string,uint,uint,uint){
           
           return(PROD[id].pid,PROD[id].pname,PROD[id].pbrand,  PROD[id].pquantity,PROD[id].pprice,PROD[id].time);
       } 
       
       function vieworder(uint id2)public constant returns(uint,address,string,string,uint,uint,uint){
           
           return (ORDER[id2].id2,ORDER[id2].cid, ORDER[id2].name, ORDER[id2].brand,ORDER[id2].quantity,ORDER[id2].price, ORDER[id2].time);
       }
       
       function outOfStock(uint id)public constant returns(uint,uint){
            require(PROD[id].pquantity==0);
            return (PROD[id].pid,PROD[id].pquantity);
       }
       
       
      
        
         
         
    
}
   
     
 