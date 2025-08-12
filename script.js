let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let resetScoreBtn = document.querySelector("#reset-score-btn");
let result = document.querySelector(".result");
let turnIndicator = document.querySelector("#turn-indicator");

let player1NameInput = document.querySelector(".player1-name");
let player2NameInput = document.querySelector(".player2-name");
let player1ScoreDisplay = document.querySelector(".player1-score");
let player2ScoreDisplay = document.querySelector(".player2-score");

let gameOver = false;
let turn0 = true;
let player1Score = 0;
let player2Score = 0;
let moveCount = 0;

const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8]
];

function initGame() {
    boxes.forEach(box => {
        box.innerText = "";
        box.disabled = false;
        box.classList.remove("winner", "draw", "x", "o");
        box.style.backgroundColor = "#2c3e50";
    });
    turn0 = true;
    moveCount = 0;
    gameOver = false;
    result.innerText = "";
    updateTurnIndicator();
}

function updateTurnIndicator() {
    const playerName = turn0 ? 
        (player1NameInput.value || "Player 1") : 
        (player2NameInput.value || "Player 2");
    const symbol = turn0 ? "O" : "X";
    turnIndicator.textContent = `${playerName}'s Turn (${symbol})`;
    turnIndicator.style.color = turn0 ? "#48dbfb" : "#ff6b6b";
}

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (!gameOver && !box.disabled) {
            moveCount++;
            if (turn0) {
                box.innerText = "O";
                box.classList.add("o");
                turn0 = false;
            } else {
                box.innerText = "X";
                box.classList.add("x");
                turn0 = true;
            }
            box.disabled = true;
            checkWinner();
            if (!gameOver) updateTurnIndicator();
        }
    });
});

function checkWinner() {
    for (let pattern of winPatterns) {
        const pos1 = boxes[pattern[0]];
        const pos2 = boxes[pattern[1]];
        const pos3 = boxes[pattern[2]];

        if (pos1.innerText && pos1.innerText === pos2.innerText && pos2.innerText === pos3.innerText) {
            pos1.classList.add("winner");
            pos2.classList.add("winner");
            pos3.classList.add("winner");

            const winnerName = pos1.innerText === "O" 
                ? (player1NameInput.value || "Player 1") 
                : (player2NameInput.value || "Player 2");

            result.innerHTML = `🎉 ${winnerName} Wins! 🎉`;
            result.style.color = pos1.innerText === "O" ? "#48dbfb" : "#ff6b6b";
            updateScore(pos1.innerText);
            gameOver = true;
            boxes.forEach(box => box.disabled = true);
            return;
        }
    }

    if (moveCount === 9 && !gameOver) {
        boxes.forEach(box => box.classList.add("draw"));
        result.innerText = "Game Ended in a Draw!";
        result.style.color = "#f39c12";
        gameOver = true;
    }
}

function updateScore(symbol) {
    if (symbol === "O") {
        player1Score++;
        player1ScoreDisplay.innerText = `Score: ${player1Score}`;
    } else {
        player2Score++;
        player2ScoreDisplay.innerText = `Score: ${player2Score}`;
    }
}

resetBtn.addEventListener("click", initGame);

resetScoreBtn.addEventListener("click", () => {
    player1Score = 0;
    player2Score = 0;
    player1ScoreDisplay.innerText = "Score: 0";
    player2ScoreDisplay.innerText = "Score: 0";
    initGame();
});

player1NameInput.addEventListener("input", updateTurnIndicator);
player2NameInput.addEventListener("input", updateTurnIndicator);

initGame();
