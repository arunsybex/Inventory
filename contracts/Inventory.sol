pragma solidity ^0.4.0;

contract Inventory{
     
   uint256 public productCount=0;
   uint256 public ordercount=0;
   uint256[] public p_id;
   uint256[] public o_id;
   uint256[] public c_id;
   
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
             uint id1;
             address cid;
             string name;
             string brand;
             uint quantity;
             uint price;
             uint time;
             uint status;
            
            }
        
       
        
        struct in_order{
            uint ipid;
            uint iquantity;
            uint iprice;
           }
     struct cancellorder{
         uint oid;
         uint pid;
         address c_address;
         uint price;
         uint time;
     }
                          
    
    mapping(uint=>product)public PROD;
    mapping(uint=>productorder)public ORDER;
    mapping(uint=>in_order)public UPDATE;
    mapping(uint=>cancellorder)public CANCELL;
    
    address public owner;

    constructor() payable public {
        owner = msg.sender;
    }

    modifier onlyOwner {
        require (owner == msg.sender);
        _;
    }
    
    function view1(uint id)public constant returns(uint){
         return (PROD[id].pprice);
     }
    
    function p_details(uint id,string name,string brand,uint quantity,uint price)public  payable onlyOwner   {
        require(PROD[id].pid!=id);
        PROD[id].pid = id;
        PROD[id].pname = name;
        PROD[id].pbrand = brand;
        PROD[id].pquantity = quantity;
        PROD[id].pprice = price;
        PROD[id].time = now;
        p_id.push(id);
        productCount++;
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
           ORDER[id2].id2 = id2;
           ORDER[id2].cid = msg.sender;
           ORDER[id2].id1=id;
           ORDER[id2].name =PROD[id].pname ;
           ORDER[id2].brand =  PROD[id].pbrand;
           ORDER[id2].quantity=pquantity;
           ORDER[id2].price = pquantity *  PROD[id].pprice; 
           ORDER[id2].time = now;
           ORDER[id2].status = 1;
           PROD[id].pquantity-=pquantity;
           ORDER[id2].price = msg.value;
           o_id.push(id2);
           ordercount++;
          
           
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
       
       
       function vieworder(uint id2)public constant returns(uint,address,uint,uint,uint,uint,uint){
                  
           return (ORDER[id2].id2,ORDER[id2].cid, ORDER[id2].id1,  ORDER[id2].quantity,ORDER[id2].price, ORDER[id2].time, ORDER[id2].status);
           
       }
       
       function outOfStock(uint id)public constant returns(uint,uint,uint){
            return (PROD[id].pid,PROD[id].pquantity,PROD[id].pprice);
       }
       
       function ordercancel(uint oid,uint id)public{
         require(msg.sender== ORDER[oid].cid);
         uint t =(now -  ORDER[oid].time );
           require(t<= 3600 seconds);
       
            PROD[id].pquantity += ORDER[oid].quantity ;
            ORDER[oid].status = 0;
           CANCELL[oid].oid = oid;
           CANCELL[oid].pid = id ;
           CANCELL[oid]. c_address =  ORDER[oid].cid ;
           CANCELL[oid].price =  ORDER[oid].price;
           CANCELL[oid].time = now;
                                   
           msg.sender.transfer(ORDER[oid].price);
            c_id.push(oid);
            
            
         }
         
         function getcancell_list()public view returns(uint256[]){
             return c_id;
         }
        
         
         function cancel_list(uint oid)public constant returns(uint,uint,address,uint,uint){
             return (CANCELL[oid].oid , CANCELL[oid].pid , CANCELL[oid]. c_address, CANCELL[oid].price , CANCELL[oid].time);
         }
    
        function transferOwnership(address newowner) payable public onlyOwner {
            owner = newowner;
        }
        function getbalance()public constant returns(uint256){
            return  address(this).balance;
        }
        
        function withdraw(uint amount)payable public onlyOwner returns(bool) {
            uint x=amount *1 ether;
            require(x<address(this).balance);
            owner.transfer(x);
            return true;
        }
        
        


    }
   
     
 