// const lines = document.querySelectorAll("line");
// console.log(lines)
// lines.forEach(function(line){
//     line.style.stroke = "red";

// });

// let line2 = document.getElementsByTagName("line");

// const head = document.querySelector("circle");
// head.style.stroke ="red";

// const man= document.querySelectorAll(".figure-part");
// console.log(man);
// man.forEach(function (part) {
//     part.style.stroke= "yellow";
// });
// const pop = document.getElementById("popup");
// pop.style.display="none";
const correctLetters = [];
const wrongLetters = [];

const wrongLettersEl = document.getElementById('wrong-letters-container');
const wordEl = document.getElementById('word-container');
const popup = document.getElementById('popup-container');
const notification = document.getElementById('notification-container');
const finalMessage = document.getElementById('final-message');
const playAgainBtn = document.getElementById('play-button');
const letter_previously_entered = document.getElementById("letter-previously-entered");
const figure_parts = document.querySelectorAll(".figure-part");
let gameplaying = true;

playAgainBtn.addEventListener("click",function(){
    gameplaying =true;
    correctLetters.splice(0);
    wrongLetters.splice(0);
    updateWrongLetters();
    getrandomword();
    displayword();
    popup.style.display = "none";
});

function updateWrongLetters() {

    //let result = "<p>Wrong Letters</p>";
    let result = wrongLetters.length > 0 ? '<p>Wrong</p>' : '';

    for (const letter of wrongLetters) {
        result += "<span>" + letter + "</span>"
    }
    result = result.replaceAll("</span><span>", "</span>, <span>");

    wrongLettersEl.innerHTML = result;
    figure_parts.forEach(function (part, index) {
        if (index < wrongLetters.length) {
            part.style.display = "block";
        } else {
            part.style.display = "none";
        }
    });

    if (wrongLetters.length == figure_parts.length) {
        gameplaying = false;
        finalMessage.innerHTML = "you lose"
        popup.style.display = "flex";
    }


}


function showNotification(letter) {
    letter_previously_entered.textContent = letter;
    notification.classList.add("show");
    setTimeout(function () {
        notification.classList.remove("show");
    }, 2000);
}

window.addEventListener("keydown", function (event) {
    if (gameplaying) {


        const keyPress = event.key;
        if (keyPress.match(/^[a-z]/g)) {
            console.log(keyPress);
            if (selectword.includes(keyPress)) {
                if (!correctLetters.includes(keyPress)) {
                    correctLetters.push(keyPress);
                    displayword();
                    console.log("CORRECT " + correctLetters);
                } else {
                    //displayword();
                    console.log("CORRECT " + correctLetters);
                    showNotification(keyPress);

                }
            } else {
                if (!wrongLetters.includes(keyPress)) {
                    wrongLetters.push(keyPress);
                    console.log("INCORRECT " + wrongLetters);
                    updateWrongLetters();

                } else {
                    console.log("INCORRECT " + wrongLetters);
                    showNotification(keyPress);

                }
            }

        }
    }
});

// wordEl.textContent="<span>b</span><span>a</span><span>b</span>";
let selectword;
function getrandomword() {
    const words = ["butter", "jam", "bat", "rabbit"];
    const randindex = Math.floor(Math.random() * words.length);
    selectword = words[randindex].toLowerCase();

}

function displayword() {


    const letters = selectword.split("");
    let result = "";
    for (const letter of letters) {
        result += "<span>";
        //result+=letter;
        result += correctLetters.includes(letter) ? letter : "";

        result += "</span>";
    }
    wordEl.innerHTML = result;

    const innerLetters = wordEl.innerText.replace(/\n/g, '');;
    console.log(innerLetters);
    if (innerLetters == selectword) {
        gameplaying = false;
        finalMessage.innerHTML = "you winner"
        popup.style.display = "flex";


    }
}

getrandomword();
displayword();