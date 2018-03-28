pragma solidity ^0.4.0;

import "./IVM.sol";

contract Billing is Inventory{
      
    struct bill{
        string billno;
        uint cid;
        uint pid;
        bytes32 pname;
        uint price;
        uint totalprice;
    } 
      
      mapping(bytes32=>bill) BILL;
      
        function bills(string billno,uint id)public{
          bytes32 hash = keccak256(billno);
          BILL[hash].billno=billno;  
          BILL[hash].cid= CUST[id].c_id;
          BILL[hash].pid=PROD[id].pid;
          BILL[hash].pname= PROD[id].pname;
          BILL[hash].price= PROD[id].pprice;
          BILL[hash].totalprice= PROD[id].pprice* ORDER[id].quantity;
          totalSupply += BILL[hash].totalprice;
      }
      function bill_generate(string billno)public view returns(string bill_no,uint customerId,uint productId,bytes32 productName,uint Price,uint TotalPrice){
          bytes32 hash = keccak256(billno);
          return (BILL[hash].billno, BILL[hash].cid,BILL[hash].pid,BILL[hash].pname,BILL[hash].price, BILL[hash].totalprice);
      }
}