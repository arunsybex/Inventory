
	var ab= document.getElementById('but_id');
	var b= document.getElementById('buttab_id');
	var c= document.getElementById('buttabc_id');
	var ba= document.getElementById('butt_id');
    var output = document.getElementById('hashresult');
    var preoutput = document.getElementById('prehashresult');

     ab.addEventListener('click',function(){

      var self=this;
        return sybex.totalSupply(function (error,result){
          if (!error) {
            preoutput.innerHTML = result;
            console.log(result);
                           
          } else {
            preoutput.innerHTML = "Error";
            console.error(error);
          }
      });
    });

   
   b.addEventListener('click',function(){
        return sybex.transfer( _to.value,_value.value, function(error,result){
          if (!error) {
            preoutput.innerHTML = result;
            console.log(result);
                           
          } else {
            preoutput.innerHTML = "Error";
            console.error(error);
          }
      });
    });
  c.addEventListener('click',function(){
        return sybex.balanceOf(_ownner.value, function(error,result){
          if (!error) {
            preoutput.innerHTML = result;
            console.log(result);
                           
          } else {
            preoutput.innerHTML = "Error";
            console.error(error);
          }
      });
    });
  ba.addEventListener('click',function(){
        return sybex.sendEther( function(error,result){
          if (!error) {
            preoutput.innerHTML = result;
            console.log(result);
                           
          } else {
            preoutput.innerHTML = "Error";
            console.error(error);
          }
      });
    });
