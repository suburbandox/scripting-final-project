var startBtn = document.getElementById('start');
var input = "";
var tot = 0;
var cont = 0;
var ave =0;
startBtn.addEventListener('click', function () {

    while (input != "Q"&&input!="q") {
        //console.log(444);
        input = prompt("Enter a number or press Q to quit.");
        if ( !isNaN(input)) {
            tot += parseFloat(input);
            cont++;
            console.log(input)
        }
        else {
            alert("That's not a a valid number")
            continue;
        }
    }
    ave =tot/cont;
    //console.log(tot);
    //console.log(cont);

    console.log("your numbers added up to "+tot+" and you entered "
    +cont+" numbers with an average of "+ave);
    input="";
    cont=0;
    tot=0;
});
