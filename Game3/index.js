const grid = document.querySelector(".grid");
const squares = document.querySelectorAll(".square");
const timeLeft = document.querySelector("#time-left")
const result = document.querySelector("#score")

let game;
let timeInt
let position;
let score = 0;
let time = 10;
function randomSquare(){
    squares.forEach((value) => {
        value.classList.remove("mole");
    })
    let randomS = squares[Math.floor(Math.random()*9)]
    randomS.classList.add("mole")
    position = randomS.id;
}

function countDown(){
    time--;
    timeLeft.textContent = time;
    if(time == 0){
        clearInterval(game);
        clearInterval(timeInt);
        alert("The game is over")
        squares.forEach((value) => {
            value.classList.remove("mole");
        })
    }
}

squares.forEach(function(value){
    value.addEventListener("click", () => {
        if(value.id == position){
            score++;
            result.textContent = score;
            position = null
        }
    })
})  


function startGame(){
    game = setInterval(randomSquare, 1000);
    timeInt = setInterval(countDown, 1000);
}

startGame();