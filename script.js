const board = document.getElementById("board");
const status = document.getElementById("status");

let currentPlayer = "X";
let gameBoard = ["", "", "", "", "", "", "", "", ""];

function createCell(index) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.setAttribute("data-index", index);
    cell.addEventListener("click", () => handleCellClick(index));
    return cell;
}

function updateBoard() {
    board.innerHTML = "";
    gameBoard.forEach((value, index) => {
        const cell = createCell(index);
        cell.textContent = value;
        board.appendChild(cell);
    });
}

function handleCellClick(index) {
    if (gameBoard[index] === "" && !checkWinner()) {
        gameBoard[index] = currentPlayer;
        updateBoard();
        if (checkWinner()) {
            highlightWinningCombination();
            status.textContent = `Player ${currentPlayer} wins!`;
        } else if (gameBoard.every((cell) => cell !== "")) {
            status.textContent = "It's a draw!";
        } else {
            currentPlayer = currentPlayer === "X" ? "O" : "X";
            status.textContent = `Player ${currentPlayer}'s turn`;
        }
    }
}

function highlightWinningCombination() {
    const winningCombos = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]             // Diagonals
    ];

    for (const combo of winningCombos) {
        const [a, b, c] = combo;
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            // Highlight the winning combination
            const cells = document.querySelectorAll(`.cell[data-index="${a}"], .cell[data-index="${b}"], .cell[data-index="${c}"]`);
            cells.forEach(cell => {
                cell.classList.add(currentPlayer === 'X' ? 'x-win' : 'o-win');
            });
            break;
        }
    }
}


function checkWinner() {
    const winningCombos = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]             // Diagonals
    ];

    for (const combo of winningCombos) {
        const [a, b, c] = combo;
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            return true;
        }
    }

    return false;
}

function resetGame() {
    currentPlayer = "X";
    gameBoard = ["", "", "", "", "", "", "", "", ""];
    updateBoard();
    status.textContent = "Player X's turn";
}

// Initial setup
updateBoard();
status.textContent = "Player X's turn";
