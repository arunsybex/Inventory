/* function Add() {
    var ddl = document.getElementById("product");
    var option = document.createElement("OPTION");
    option.innerHTML = document.getElementById("id4").value;
    option.value = document.getElementById("id4").value;
    ddl.options.add(option);
}*/

var i = 0;

function Add() {

   var v = document.getElementById("id4").value;

   // get the TextBox Value and assign it into the variable

   AddOpt = new Option(v, v);

   document.getElementById("product").options[i++] = AddOpt;

   return true;

}

function deleteValue() {

    var s = 1;

    var Index;

    if (document.getElementById("product").selectedIndex == -1) {

       alert("Please select any item from the ListBox");

       return true;

    }

    while (s > 0) {

        Index = document.getElementById("product").selectedIndex;

        if (Index >= 0) {

             document.getElementById("product").options[Index] = null;

              --i;

        }

        else{

           s = 0;
         }
    }
    return true;

}