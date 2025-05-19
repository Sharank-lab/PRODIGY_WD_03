const board = document.getElementById("gameBoard");
const statusText = document.getElementById("status");
const resetButton = document.getElementById("reset");
const toggleModeButton = document.getElementById("toggleMode");

let cells = [];
let currentPlayer = "X";
let gameActive = true;
let aiMode = false;

const winningCombos = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6]
];

function createBoard() {
  board.innerHTML = '';
  cells = [];
  for (let i = 0; i < 9; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.addEventListener("click", () => handleClick(i));
    board.appendChild(cell);
    cells.push(cell);
  }
}

function handleClick(index) {
  if (!gameActive || cells[index].textContent !== '') return;

  cells[index].textContent = currentPlayer;
  if (checkWin()) {
    statusText.textContent = `Player ${currentPlayer} wins!`;
    gameActive = false;
    return;
  } else if (isDraw()) {
    statusText.textContent = `It's a draw!`;
    gameActive = false;
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";
  statusText.textContent = `Player ${currentPlayer}'s turn`;

  if (aiMode && currentPlayer === "O") {
    setTimeout(aiMove, 500);
  }
}

function aiMove() {
  let emptyCells = cells
    .map((cell, idx) => (cell.textContent === '' ? idx : null))
    .filter(idx => idx !== null);
  if (emptyCells.length === 0) return;

  let randomIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];
  handleClick(randomIndex);
}

function checkWin() {
  return winningCombos.some(combo => {
    return combo.every(index => cells[index].textContent === currentPlayer);
  });
}

function isDraw() {
  return cells.every(cell => cell.textContent !== '');
}

function resetGame() {
  createBoard();
  currentPlayer = "X";
  gameActive = true;
  statusText.textContent = `Player ${currentPlayer}'s turn`;
}

function toggleMode() {
  aiMode = !aiMode;
  toggleModeButton.textContent = aiMode ? "Switch to 2 Player Mode" : "Switch to AI Mode";
  resetGame();
}

// Initial setup
createBoard();
resetButton.addEventListener("click", resetGame);
toggleModeButton.addEventListener("click", toggleMode);
