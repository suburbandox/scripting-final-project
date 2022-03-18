var startBtn = document.getElementById('start');
var input = "";
var tot = 0;
var cont = 0;
var ave =0;
startBtn.addEventListener('click', function () {
    while (input != "Q") {
        //console.log(444);
        input = prompt("enter a number or press Q to quit.");
        if (input != "Q" && isNaN(input)) {
            input = prompt("enter a number.");
            if (!isNaN(input)) {
                tot += parseFloat(input);
                cont++;
                //break;
            }
            else{
                alert("Next time follow the rules!");
                ave = 0;
                break;
            }
            //break;
        }
        else if(input ==="Q"){break;}
        else {
            tot += parseFloat(input);
            cont++;
        }
        ave =tot/cont;
    }
    //console.log(tot);
    //console.log(cont);

    console.log("your numbers added up to "+tot+" and you enterd "
    +cont+" numbers with an advrege of "+ave);
    input="";
    cont=0;
    tot=0;
});
