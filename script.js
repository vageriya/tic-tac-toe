document.addEventListener('DOMContentLoaded', () => {
    const boardElement = document.getElementById('board');
    const newGameButton = document.getElementById('new-game');
    const undoButton = document.getElementById('undo');
    let board = ['', '', '', '', '', '', '', '', ''];
    let currentPlayer = 'X';
  
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
      updateBoard();
    });
  
    // Event listener for Undo button
    undoButton.addEventListener('click', () => {
      undoMove();
    });
  
    // Function to handle cell click
    function handleCellClick(event) {
      const index = event.target.dataset.index;
      if (board[index] === '' && !isGameOver()) {
        board[index] = currentPlayer;
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        updateBoard();
      }
    }
  
    // Function to update the board UI
    function updateBoard() {
      const cells = document.querySelectorAll('.cell');
      cells.forEach((cell, index) => {
        cell.textContent = board[index];
      });
  
      if (isGameOver()) {
        alert(`Game over! Player ${currentPlayer === 'X' ? 'O' : 'X'} wins!`);
      }
    }
  
    // Function to check if the game is over
    function isGameOver() {
      return checkWinner('X') || checkWinner('O') || board.every(cell => cell !== '');
    }
  
    // Function to check if a player has won
    function checkWinner(player) {
      const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]             // Diagonals
      ];
  
      return winningCombinations.some(combination => {
        return combination.every(index => board[index] === player);
      });
    }
  
    // Function to undo the last move
    function undoMove() {
      if (!isGameOver()) {
        const lastMoveIndex = board.lastIndexOf('X') !== -1 ? board.lastIndexOf('X') : board.lastIndexOf('O');
        if (lastMoveIndex !== -1) {
          board[lastMoveIndex] = '';
          currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
          updateBoard();
        }
      }
    }
  });
  