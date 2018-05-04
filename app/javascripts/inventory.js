var inven = 
function inventory(){
    inven.Inventory(function(err,result){
        console.log(result);
    });
}
function customer(){
    var x = document.getElementById().value;
    inven.user(x, function(error,result){
        console.log(result);
    });
}
function product(){
	var a=document.getElementById("id1").value;
	var b=document.getElementById("name1").value;
    var c=document.getElementById("brand1").value;
    var d=document.getElementById("quantity1").value;
    var e=document.getElementById("amount").value;
	inven.p_details(a,b,c,d,e, function(error,result){
		console.log(result);

	});
   
}

 function Cutomerorder(){
    var a=document.getElementById("id2").value;
    var b=document.getElementById("id3").value;
    var c=document.getElementById("name2").value;
    var d=document.getElementById("brand2").value;
    var e=document.getElementById("qnty").value;
    inven.order(a,b,c,d,e, function(error,result){
		console.log(result);

	});
   
 }

 function purchase(){
    var a=document.getElementById("id").value;
    var b=document.getElementById("name").value;
    var c=document.getElementById("brand").value;
    var d=document.getElementById("quantity").value;
    var e=document.getElementById("price").value;
    inven.purchase_order(a,b,c,d,e, function(error,result){
		console.log(result);

	});

 }

 function Addproduct(){
    var a=document.getElementById("id4").value;
    var b=document.getElementById("addname").value;
    var c=document.getElementById("addbrand").value;
    var d=document.getElementById("addquantity").value;
    inven.purchase_order(a,b,c,d, function(error,result){
		console.log(result);

	});

 }