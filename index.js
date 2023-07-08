function open_card () {
  document.getElementById("outside").className="open-card"}
function close_card () {
  document.getElementById("outside").className="close-card"
}


const cells = document.querySelectorAll('.cell');
const statusText = document.querySelector("#statusText");
const restartBtn = document.querySelector("#restartBtn");
const winConditions=[
 //Rows-horizontal combo
  [0,1,2,3,],[5,6,7,8],[11,12,13,14],[15,16,17,18],[20,21,22,23],
  // //Colums-vertical combo
  [0,5,10,15],[1,6,11,16], [2,7,12,17],
  [3,8,13,18],[4,9,14,19],
  // Diagonal Combo
  [0,6,12,18],[1,7,13,19],[5,11,17,23],[3,7,11,15],[4,8,12,16],[9,13,17,21]
];
let options=['','','','','',
              '','','','','',
              '','','','','',
              '','','','','',
              '','','','','']
let currentPlayer="😋";
let running = false;

initializeGame();

for (let i = 0; i < cells.length; i++){
  cells[i].addEventListener('click', playSound);
}

function playSound(){
  const audio = new Audio("images/beep.mp3");
  audio.play();
}

function winSound(){
  const audio = new Audio("images/win.mp3")
  audio.play();
}



function initializeGame(){
    cells.forEach(cell => cell.addEventListener("click", cellClicked));
    restartBtn.addEventListener("click", restartGame);
    statusText.textContent = `${currentPlayer}'s turn`;
    running = true;
}


function cellClicked(){
    const cellIndex = this.getAttribute("cellIndex");

    if(options[cellIndex] != "" || !running){
        return;
    }

    updateCell(this, cellIndex);
    checkWinner();
}
function updateCell(cell, index){
    options[index] = currentPlayer;
    cell.textContent = currentPlayer;
}

function changePlayer(){
    currentPlayer = (currentPlayer == "😋") ? "🤓" : "😋";
    // turnBoxCSS();
    statusText.textContent = `${currentPlayer}'s turn`;
}
function checkWinner(){
    let roundWon = false;

    for(let i = 0; i < winConditions.length; i++){
        const condition = winConditions[i];
        const cellA = options[condition[0]];
        const cellB = options[condition[1]];
        const cellC = options[condition[2]];
        const cellD = options[condition[3]];
      
        if(cellA == "" || cellB == "" || cellC == "" || cellD =="" ){
            continue;
        }
        if(cellA == cellB && cellB == cellC && cellC ==cellD ){
            roundWon = true;
           break;
        }
    }

    if(roundWon){
        statusText.textContent = `${currentPlayer} wins!`;
        winSound()
        running = false;
    }
    else if(!options.includes("")){
        statusText.textContent = `Draw!`;
        running = false;
    }
    else{
        changePlayer();
    }
}


function restartGame(){
    currentPlayer = "😋";
    options = ['','','','','', '','','','','', '','','','','', '','','','','', '','','','',''];
    statusText.textContent = `${currentPlayer}'s turn`;
    cells.forEach(cell => cell.textContent = "");
    running = true;
}











