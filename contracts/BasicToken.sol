pragma solidity ^0.4.18;



import "./SafeMath.sol";



contract BasicToken  {
  using SafeMath for uint256;
  
    address owner;
    string public standard="Token 1.0";
    string public name;
    string public symbol;
    uint public decimals ;
    uint256 public  totalSupply;
    uint256  initialallowed;
    uint public rate=0.1 ether;


  mapping(address => uint256) balances;

 
  function BasicToken()public{
    totalSupply=50000;
    balances[msg.sender]= totalSupply;
    name = "NEW TOKEN";
    symbol="$CT";
    decimals = 0;
    owner=msg.sender;
   }

 
  function totalSupply() public view returns (uint256) {
    return totalSupply;
  }

  
  function transfer(address _to, uint256 _value) public returns (bool) {
    require(_to != address(0));
    require(_value <= balances[msg.sender]);
    balances[msg.sender] = balances[msg.sender].sub(_value);
    balances[_to] = balances[_to].add(_value);
    return true;
       
  }

  
  function balanceOf(address _owner) public view  returns (uint256 balance) {
    return balances[_owner];
  }
  
 function sendEther() public payable returns(uint256)  {
        uint256 t=msg.value/rate;
        require(balances[owner]>t && msg.value==rate*t);
        owner.transfer(msg.value);
        balances[msg.sender]=balances[msg.sender]+t;
        balances[owner]=balances[owner]-t;
        return balances[msg.sender];
 }
 
 
}