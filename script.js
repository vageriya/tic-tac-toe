document.addEventListener('DOMContentLoaded', () => {
  // ... (Vanta.js initialization remains unchanged)

  const boardElement = document.getElementById('board');
  const newGameButton = document.getElementById('new-game');
  const undoButton = document.getElementById('undo');
  const statusMessage = document.createElement('div');
  let board = ['', '', '', '', '', '', '', '', ''];
  let currentPlayer = 'X';
  let gameEnded = false;

  // Create the Tic Tac Toe board
  for (let i = 0; i < 9; i++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.dataset.index = i;
    cell.addEventListener('click', handleCellClick);
    boardElement.appendChild(cell);
  }

  // Event listener for New Game button
  newGameButton.addEventListener('click', () => {
    board = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    gameEnded = false;
    updateBoard();
    resetStatusMessage();
  });

  // Event listener for Undo button
  undoButton.addEventListener('click', () => {
    undoMove();
  });

  // Function to handle cell click
  function handleCellClick(event) {
    if (!gameEnded) {
      const index = event.target.dataset.index;
      if (board[index] === '') {
        board[index] = currentPlayer;
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        updateBoard();
        checkGameResult();
      }
    }
  }

  // Function to update the board UI
  function updateBoard() {
    const cells = document.querySelectorAll('.cell');
    cells.forEach((cell, index) => {
      cell.textContent = board[index];
    });
  }

  // Function to check if the game is over
  function checkGameResult() {
    if (checkWinner('X')) {
      endGame('X');
    } else if (checkWinner('O')) {
      endGame('O');
    } else if (board.every(cell => cell !== '')) {
      endGame('Draw');
    }
  }

  // Function to end the game
  function endGame(result) {
    gameEnded = true;
    highlightWinningCombination(result === 'Draw' ? [] : getWinningCombination());
    displayStatusMessage(result === 'Draw' ? 'It\'s a Draw!' : `Player ${result} wins!`);
  }

  // Function to highlight the winning combination
  function highlightWinningCombination(winningCombination) {
    const cells = document.querySelectorAll('.cell');
    cells.forEach((cell, index) => {
      cell.classList.remove('winner');
      if (winningCombination.includes(index)) {
        cell.classList.add('winner');
      }
    });
  }

  // Function to get the winning combination
  function getWinningCombination() {
    const winningCombinations = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
      [0, 4, 8], [2, 4, 6]             // Diagonals
    ];

    for (const combination of winningCombinations) {
      const [a, b, c] = combination;
      if (board[a] !== '' && board[a] === board[b] && board[a] === board[c]) {
        return combination;
      }
    }

    return [];
  }

  // Function to display the status message
  function displayStatusMessage(message) {
    statusMessage.textContent = message;
    statusMessage.classList.add('status-message');
    document.getElementById('game-container').appendChild(statusMessage);
  }

  // Function to reset the status message
  function resetStatusMessage() {
    statusMessage.textContent = '';
    statusMessage.classList.remove('status-message');
  }
});
