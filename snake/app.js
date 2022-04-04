
document.addEventListener('DOMContentLoaded', () => {
    const squares = document.querySelectorAll('.grid div')
    const scoreDisplay = document.querySelector('#score2')
    const startBtn = document.querySelector('.pushable')
    const upBtn = document.querySelector('#up')
    var a = document.querySelector('#audio')
    const one = document.getElementById("one")
    const two = document.getElementById("two")
    const three = document.getElementById("three")
    const four = document.getElementById("four")
    const timer = 200;
    const w = document.getElementById("w")
    const ak = document.getElementById("a")
    const s = document.getElementById("s")
    const d = document.getElementById("d")
    const play = document.getElementById("play-button")
    const popup = document.getElementById("popup-container")
    const fin = document.getElementById("final-message")

  
    const width = 10
    let currentIndex = 0 //so first div in our grid
    let appleIndex = 0 //so first div in our grid
    let currentSnake = [2,1,0] 
    let direction = 1
    let score = 0
    let speed = 0.9
    let intervalTime = 0
    let interval = 0
  
  
    //to start, and restart the game
    function startGame() {
      //fin.innerHTML ="Welcome to Snake.<br>Click Play to begin." 
      popup.style.display = "none"
      currentSnake.forEach(index => squares[index].classList.remove('snake'))
      squares[appleIndex].classList.remove('apple')
      clearInterval(interval)
      score = 0
      randomApple()
      direction = 1
      scoreDisplay.innerText = score
      intervalTime = 1000
      currentSnake = [2,1,0]
      currentIndex = 0
      currentSnake.forEach(index => squares[index].classList.add('snake'))
      interval = setInterval(moveOutcomes, intervalTime)
    }
  
  
    //function that deals with ALL the ove outcomes of the Snake
    function moveOutcomes() {
  
      //deals with snake hitting border and snake hitting self
      if (
        (currentSnake[0] + width >= (width * width) && direction === width ) || //if snake hits bottom
        (currentSnake[0] % width === width -1 && direction === 1) || //if snake hits right wall
        (currentSnake[0] % width === 0 && direction === -1) || //if snake hits left wall
        (currentSnake[0] - width < 0 && direction === -width) ||  //if snake hits the top
        squares[currentSnake[0] + direction].classList.contains('snake') //if snake goes into itself
      ) {
        popup.style.display = "flex"
        fin.innerText="Sorry, Game over, you hit something try again"
        return clearInterval(interval) //this will clear the interval if any of the above happen
        

      }
  
      const tail = currentSnake.pop() //removes last ite of the array and shows it
      squares[tail].classList.remove('snake')  //removes class of snake from the TAIL
      currentSnake.unshift(currentSnake[0] + direction) //gives direction to the head of the array
  
      //deals with snake getting apple
      if(squares[currentSnake[0]].classList.contains('apple')) {
        squares[currentSnake[0]].classList.remove('apple')
        squares[tail].classList.add('snake')
        currentSnake.push(tail)
        randomApple()
        score++
        a.play()
        scoreDisplay.textContent = score
        clearInterval(interval)
        intervalTime = intervalTime * speed
        interval = setInterval(moveOutcomes, intervalTime)
      }
      if(score>=10){winner()}
      squares[currentSnake[0]].classList.add('snake')
    }
  
  
    //generate new apple once apple is eaten
    function randomApple() {
      
      do{
        appleIndex = Math.floor(Math.random() * squares.length)
      } while(squares[appleIndex].classList.contains('snake')) //making sure apples dont appear on the snake
      squares[appleIndex].classList.add('apple')
    }
  
  
    //assign functions to keycodes
    function control(e) {
      squares[currentIndex].classList.remove('snake')
  
      if(e.keyCode === 39) {
        flash(four)
        direction = 1 //if we press the right arrow on our keyboard, the snake will go right one
      } else if (e.keyCode === 38 ) {
        flash(one)
        direction = -width // if we press the up arrow, the snake will go back ten divs, appearing to go up
      } else if (e.keyCode === 37) {
        flash(two)
        direction = -1 // if we press left, the snake will go left one div
      } else if (e.keyCode === 40) {
        flash(three)
        direction = +width //if we press down, the snake head will instantly appear in the div ten divs from where you are now
      }else if (e.keyCode === 32){
        startGame()
      }else if (e.keyCode===87) {
      flash(w)
      direction = -width // if we press the up arrow, the snake will go back ten divs, appearing to go up
      } else if (e.keyCode===65) {
        flash(ak)
        direction = -1 // if we press left, the snake will go left one div
      } else if ( e.keyCode===83) {
        flash(s)
        direction = +width //if we press down, the snake head will instantly appear in the div ten divs from where you are now
      }else if(e.keyCode===68) {
        flash(d)
        direction = 1
      }
      //}
    }
    function flash(x){
      x.style.backgroundColor ="white"
      setTimeout(flash2,timer)
    }
    function flash2()
    {
      one.style.backgroundColor ="red"
      two.style.backgroundColor ="red"
      three.style.backgroundColor ="red"
      four.style.backgroundColor ="red"
      w.style.backgroundColor ="red"
      s.style.backgroundColor ="red"
      d.style.backgroundColor ="red"
      ak.style.backgroundColor ="red"
    }
    function winner(){
      popup.style.display = "flex"
      clearInterval(interval)
      fin.innerText="Youe win!! Play again?"
    }
  
    document.addEventListener('keyup', control)
    startBtn.addEventListener('click', startGame)
    play.addEventListener('click', startGame)
  })