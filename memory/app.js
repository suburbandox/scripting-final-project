document.addEventListener("DOMContentLoaded", () => {


const cardArray = [ 
    { name: "fries", img: "images/fries.png" }, 
    { name: "fries", img: "images/fries.png" },
    { name: "pizza", img: "images/pizza.png" },
    { name: "pizza", img: "images/pizza.png" }, 
    { name: "milkshake", img: "images/milkshake.png" },
    { name: "milkshake", img: "images/milkshake.png" }, 
    { name: "ice-cream", img: "images/ice-cream.png"},
    { name: "ice-cream", img: "images/ice-cream.png" },
    { name: "hotdog", img: "images/hotdog.png" },
    { name: "hotdog", img: "images/hotdog.png" },
    { name: "cheeseburger", img: "images/cheeseburger.png" },
    { name: "cheeseburger", img: "images/cheeseburger.png" } 
    ]; 

cardArray.sort(() => 0.5 - Math.random())

const grid = document.querySelector(".grid");
const resultDisplay = document.querySelector("#result")
var cardChosen =  []
var cardChosenId =  []
var cardsWon = []
var cl = 0
const clicks = document.querySelector("#c")
let board = [
    ["","","",""],
    ["","","",""],
    ["","","",""]
]
var otherid = 0

function createbord(){
    for(let i =0;i < cardArray.length;i++){
        var card = document.createElement("img");
        card.setAttribute("src", 'images/blank.png')
        card.setAttribute("data-id", i)
        card.addEventListener("click",flipCard)
        grid.appendChild(card)
    }
}

function checkForMatch(){
    var cards = document.querySelectorAll("img")
    const optionOneId = cardChosenId[0]
    const optionTwoId = cardChosenId[1]
    if(cardChosen[0] === cardChosen[1] ){
        //alert("you found a match")
        cards[optionOneId].setAttribute("src","images/white.png")
        cards[optionTwoId].setAttribute("src","images/white.png")
        cardsWon.push(cardChosen)
    }
    else{
        ///alert("Sorry, try again")
        cards[optionOneId].setAttribute("src","images/blank.png")
        //console.log(66)
        cards[optionTwoId].setAttribute("src","images/blank.png")
        cl++
        //console.log(cl)
        
 
    }
    cardChosen =  []
    cardChosenId = []
    clicks.textContent =cl
    resultDisplay.textContent = cardsWon.length
    if(cardsWon.length === cardArray.length/2){
        //resultDisplay.textContent = "Congratulations you Won!!"
        // Win()
    }
}

function flipCard(){
    var cardId = this.getAttribute("data-id")
    cardChosen.push(cardArray[cardId].name)
    cardChosenId.push(cardId)
    //console.log(cardId)


    this.setAttribute("src", cardArray[cardId].img)
    if(cardChosen.length === 2){
        if(cardChosenId[0] === cardChosenId[1])
        {
            console.log(77) 
            
        }else{

        }   
        console.log(cardChosenId[0])
        console.log(cardChosenId[1])
        setTimeout(checkForMatch,500)
       
    }
}
// function Win(){
//     // var again = confirm("Do you want to play again?")
//     // if(again)
//     // {
//     //     console.log(44)
//     //     cardArray.sort(() => 0.5 - Math.random())
//     //     cardsWon = []
//     //     cl =0
//     //     clicks.textContent =cl
//     //     resultDisplay.textContent = 0
//         // grid.innerHTML = "";


//     }

createbord()
})