const computerDisplay = document.getElementById("computer-choice");
const userDisplay = document.getElementById("user-choice");
const result = document.getElementById("result");
const button = document.querySelectorAll("button");
let userChoice;
let choice;
let final;

button.forEach(each => each.addEventListener("click", () => {
    userChoice = each.id;
    userDisplay.innerHTML = userChoice;
    getComputerChoice();
    result.innerHTML = win(choice, userChoice)
}))

function getComputerChoice(){
    const random = Math.floor(Math.random() * button.length) + 1
    switch(random){
        case 1:
            choice = "rock"
            break;
        case 2:
            choice = "paper"
            break;
        case 3:
            choice = "scissors"
            break;
    }
    computerDisplay.innerHTML = choice;
}

function win(a, b){
    if(a === "paper" && b == "scissors"){
        return "You win!"
    }
    if(a === "scissors" && b ==="paper"){
        return "You lost!"
    }
    if(a > b){
        return "You win!"
    }
    if(a == b){
        return "It's draw!"
    }
    else{
        return "You lost!"
    }
}