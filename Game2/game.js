const images = [
    {
        name: "cheese",
        image: "/images/cheeseburger.png"
    },
    {
        name: "cheese",
        image: "/images/cheeseburger.png"
    },
    {
        name: "fries",
        image: "/images/fries.png"
    },
    {
        name: "fries",
        image: "/images/fries.png"
    },
    {
        name: "ice",
        image: "/images/ice-cream.png"
    },
    {
        name: "ice",
        image: "/images/ice-cream.png"
    },
    {
        name: "milk",
        image: "/images/milkshake.png"
    },
    {
        name: "milk",
        image: "/images/milkshake.png"
    },
    {
        name: "pizza",
        image: "/images/pizza.png"
    },
    {
        name: "pizza",
        image: "/images/pizza.png"
    },
    {
        name: "hotdog",
        image: "/images/hotdog.png"
    },
    {
        name: "hotdog",
        image: "/images/hotdog.png"
    },
]
const grid = document.querySelector(".grid");
let selected = [];
let idS = [];
let score = 0;
const wons = [];
function main(){
    createGrid();
}

function createGrid(){
    for(let i in images){
        const element = document.createElement("img");
        element.src = "/images/blank.png";
        element.setAttribute("data-id", i);
        element.addEventListener("click", selectCards)
        grid.appendChild(element);
    }
    grid.style.width = "400px";
    grid.style.height = "300px";
    grid.style.display = "flex";
    grid.style["flex-wrap"] = "wrap";
    images.sort(() => 0.5 - Math.random());
}

function selectCards(){
    const id = this.dataset.id;
    const card = images[this.getAttribute("data-id")]
    if(idS[0] == id){
        this.src = "/images/blank.png";
        selected.pop();
        idS.pop();
    }else{
        this.src = card.image;
        selected.push(card.name)
        idS.push(id)
        if (selected.length == 2){
            setTimeout(checkCards, 500);
        }
    }
}

function checkCards(){
    const documents = document.querySelectorAll(".grid img");
    const element1 = documents[idS[0]];
    const element2 = documents[idS[1]]
    if(selected[0] == selected[1]){
        element1.removeEventListener("click", selectCards)
        element2.removeEventListener("click", selectCards)
        element1.setAttribute("src", "/images/white.png")
        element2.setAttribute("src", "/images/white.png")
        wons.push(selected)
        selected = [];
        idS = [];
        alert("You've found a match!")
        score++;

    }else{
        element1.setAttribute("src", "/images/blank.png")
        element2.setAttribute("src", "/images/blank.png")
        selected = [];
        idS = [];
        alert("False match")
    }
    document.getElementById("result").textContent = "Result:" + score;
    if(wons.length == (images.length/2)){
        alert("You've won the game")
    }
}

main();