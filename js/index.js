window.addEventListener("load", ()=> {
    const loader = document.querySelector(".loader-wrapper");
    loader.classList.add("loader-hidden");
    loader.addEventListener("transitionend", ()=> {
        document.body.removeChild("loader-wrapper");
    });
});
const combinations = [
    [1,2,3],
    [4,5,6],
    [7,8,9],
    [1,4,7],
    [2,5,8],
    [3,6,9],
    [1,5,9],
    [3,5,7]
];

function checkWinner() {
    for (const element of combinations) {
        const [a, b, c] = element;
        if (moves[a] && moves[a] === moves[b] && moves[a] === moves[c]) {
            winingPos = element;
            return true;
        }
    }
    return false;
}

function checkDraw(){
    return moves.every(element => element !== '');
}

var player = "First";
symbol = 'x';
moves = ['@','','','','','','','','',''];
var winingPos;

document.querySelectorAll(".btn").forEach(element => {
    element.addEventListener("click",(event)=>{
        const id = parseInt(event.target.getAttribute('data-id'));
        moves[id] = symbol;
        document.getElementById(id).innerHTML = `<img id="0${id}" src="./images/${symbol}.png" alt="${symbol} + png">`;
        if (checkWinner()) {
            document.getElementById("head").textContent = `${player} Player Wins!!!\nHats Off To You!!!`;
            document.querySelectorAll('.btn').forEach(btn => btn.disabled = true);
            winingPos.forEach(element => {
                document.getElementById("0"+element).classList.add("correct");
            });
            document.getElementById("reset").style.visibility = "visible";
        } else if (checkDraw()) {
            document.getElementById("head").textContent = `Match Draw`;
            document.querySelectorAll('.btn').forEach(btn => btn.disabled = true);
            for (let index = 1; index < 10; index++) {
                document.getElementById("0"+index).classList.add("draw");
            }
            document.getElementById("reset").style.visibility = "visible";
        } else {
            player = player === "First" ? "Second" : "First";
            symbol = symbol === "x" ? "o" : "x";
            document.getElementById('player').textContent = player;
        }
    });
});

document.getElementById("reset").addEventListener("click",()=>{
    location.reload();
});