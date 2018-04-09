var button_name=document.getElementById('bu_id');
button_name.addEventListener('click',function(){
    return sybex.bill_generate(bill_no.value, function (error,result){
      if (!error) {
        preoutput.innerHTML = result;
        console.log(result);
                       
      } else {
        preoutput.innerHTML = "Error";
        console.error(error);
      }
  });
});
