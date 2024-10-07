const gameBoard = document.getElementById('game-board');
const cells = document.querySelectorAll('.cell');
const status = document.getElementById('status');
const resetButton = document.getElementById('reset-button');

let currentPlayer = 'X';
let gameState = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;
let moveCountX = 0;
let moveCountO = 0;
let firstMovesX = null;
let firstMovesO = null;

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function handleCellClick(clickedCellEvent) {
    const clickedCell = clickedCellEvent.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-index'));

    if (gameState[clickedCellIndex] !== '' || !gameActive) {
        return;
    }

    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.textContent = currentPlayer;

    if (currentPlayer === 'X') {
        moveCountX++;
        if (moveCountX === 1) {
            firstMovesX = clickedCellIndex;
        }
        if (moveCountX === 4) {
            setTimeout(() => {
                gameState[firstMovesX] = '';
                cells[firstMovesX].textContent = '';
            }, 1000);
        }
    } else {
        moveCountO++;
        if (moveCountO === 1) {
            firstMovesO = clickedCellIndex;
        }
        if (moveCountO === 4) {
            setTimeout(() => {
                gameState[firstMovesO] = '';
                cells[firstMovesO].textContent = '';
            }, 1000);
        }
    }

    checkWin();
    checkDraw();

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    status.textContent = `Хід гравця: ${currentPlayer}`;
}

function checkWin() {
    for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
            gameActive = false;
            status.textContent = `Гравець ${gameState[a]} переміг!`;
            return;
        }
    }
}

function checkDraw() {
    if (!gameState.includes('') && gameActive) {
        gameActive = false;
        status.textContent = 'Нічия!';
    }
}

function resetGame() {
    currentPlayer = 'X';
    gameState = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    moveCountX = 0;
    moveCountO = 0;
    firstMovesX = null;
    firstMovesO = null;
    status.textContent = `Хід гравця: ${currentPlayer}`;
    cells.forEach(cell => {
        cell.textContent = '';
    });
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetButton.addEventListener('click', resetGame);

status.textContent = `Хід гравця: ${currentPlayer}`;
