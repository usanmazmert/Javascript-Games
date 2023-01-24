const grid = document.querySelector(".grid");

const blockWidth = 100;
const blockHeight = 20;
const blocks = []
const startingPos = [250, 10];
let playerPos = startingPos;
const ballStarting = [290, 40]
let ballPos = ballStarting;
const boardWidth = 600;
let Xdirection = 2;
let Ydirection = 2;
const diameter = 20;
let allElements;

function Block(){
    const xAxis = arguments[0];
    const yAxis = arguments[1];
    this.bottomLeft = [xAxis, yAxis];
    this.bottomRight = [xAxis + blockWidth, yAxis];
    this.topLeft = [xAxis, yAxis+ blockHeight];
    this.topRight= [xAxis + blockWidth, yAxis + blockHeight];
}

function createBlock(leftCoor, bottomCoor){
    if(leftCoor == 575){
        createBlock(25, bottomCoor - 30);
    }else if(bottomCoor == 180){
        return;
    }else{
        for(let i = 0; i < 5; i++){
            blocks.push(new Block(leftCoor, bottomCoor));
            leftCoor += 110
        }
        createBlock(leftCoor, bottomCoor);
    }
}

function displayBlocks(){
    for(let i in blocks){
        const block = document.createElement("div");
        block.classList.add("block")
        block.style.left = blocks[i].bottomLeft[0] + "px";
        block.style.bottom = blocks[i].bottomLeft[1] + "px";
        grid.appendChild(block);
    }
    allElements = Array.from(document.querySelectorAll(".block"))
}
function main(){
    createBlock(25, 270)
    displayBlocks();
    drawUser();
    drawBall();
}

//add user
const user = document.createElement("div");
user.classList.add("user");
grid.appendChild(user);
document.addEventListener("keydown", move)
//draw player
function drawUser(){
    user.style.left = playerPos[0] + "px";
    user.style.bottom = playerPos[1] + "px";
}

function move(e){
    switch(e.key){
        case "ArrowLeft":
            if(playerPos[0] > 0){
                playerPos[0] -= 10;
                drawUser();
            }
            break;
        case "ArrowRight":
            if(playerPos[0] < boardWidth - blockWidth){
                playerPos[0] += 10;
                drawUser()
            }
            break;
    }
}
let ballTimer = setInterval(moveBall, 30);

//add ball 
const ball = document.createElement("div");
ball.classList.add("ball")
grid.appendChild(ball)
function drawBall(){
    ball.style.left = ballPos[0] + "px";
    ball.style.bottom = ballPos[1] + "px";
}

function moveBall(){
    checkCollision();
    ballPos[0] += Xdirection;
    ballPos[1] += Ydirection;
    drawBall();
}

function checkCollision(){
    if(ballPos[0] + diameter == boardWidth || ballPos[0] == 0){
        changeDirection(true, false);
    }else if(ballPos[1] + diameter == 300){ 
        changeDirection(false, true);
    }else if (ballPos[1] === 0){
        clearInterval(ballTimer);
        alert("Game is over!")
        document.removeEventListener("keydown", move)
    }else if((ballPos[0] + diameter >= playerPos[0] && ballPos[0] <= playerPos[0] + blockWidth)&&
    (ballPos[1] + diameter === playerPos[1] || ballPos[1] === playerPos[1] + blockHeight)){
        changeDirection(false,true);
    }else if((ballPos[1] + diameter >= playerPos[1] && ballPos[1] <= playerPos[1] + blockHeight)&&
    (ballPos[0] + diameter === playerPos[0] || ballPos[0] === playerPos[0] + blockWidth)){
        changeDirection(false,true);
    }
    else{
        for(let i in blocks){
            const currentBlock = blocks[i]
            if((ballPos[0] + diameter >= currentBlock.bottomLeft[0] && ballPos[0] <= currentBlock.bottomRight[0])&&
            (ballPos[1] + diameter === currentBlock.bottomLeft[1] || ballPos[1] === currentBlock.topLeft[1])){
                changeDirection(false, true);
                allElements[i].classList.remove("block")
                blocks.splice(i, 1);
            }else if((ballPos[1] + diameter >= currentBlock.bottomLeft[1] && ballPos[1] <= currentBlock.topLeft[1])&&
            (ballPos[0] + diameter === currentBlock.bottomLeft[0] || ballPos[0] === currentBlock.bottomRight[0])){
                changeDirection(true, false)
                allElements[i].classList.remove("block")
                blocks.splice(i, 1);
            }
        }
    }
}


function changeDirection(x, y){
    if(x){
        Xdirection = -1 * Xdirection
        return;
    }
    if(y){
        Ydirection = -1 * Ydirection
        return;
    }
}
main(); 