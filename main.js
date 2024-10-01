/* // Get all buttons
const container = document.getElementById("game-container");
const buttonArray = container.querySelectorAll("button");

let playerTurn = true;
let gameEnd = false;

// Function to check for a win condition
function checkWinner() {
  const winConditions = [
    [0, 1, 2], // Row 1
    [3, 4, 5], // Row 2
    [6, 7, 8], // Row 3
    [0, 3, 6], // Column 1
    [1, 4, 7], // Column 2
    [2, 5, 8], // Column 3
    [0, 4, 8], // Diagonal 1
    [2, 4, 6], // Diagonal 2
  ];

  for (const condition of winConditions) {
    const [a, b, c] = condition;
    if (
      buttonArray[a].innerHTML !== "" &&
      buttonArray[a].innerHTML === buttonArray[b].innerHTML &&
      buttonArray[a].innerHTML === buttonArray[c].innerHTML
    ) {
      return true; // We have a winner
    }
  }
  return false; // No winner yet
}

// Add event listeners to each button once
buttonArray.forEach((button, index) => {
  button.addEventListener("click", () => {
    if (!gameEnd && button.innerHTML === "") {
      button.innerHTML = playerTurn ? "X" : "O"; // Add X or O based on the turn
      playerTurn = !playerTurn; // Toggle player turn

      if (checkWinner()) {
        gameEnd = true;
        alert(`Player ${playerTurn ? "2" : "1"} Won!`);
      }
    }
  });
});
 */

// Gameboard Module (IIFE to create a single instance of the gameboard)
const Gameboard = (() => {
  let board = ["", "", "", "", "", "", "", "", ""];

  // Function to get the board state
  const getBoard = () => board;

  // Function to update the board
  const updateBoard = (index, marker) => {
    if (board[index] === "") {
      board[index] = marker;
      return true;
    }
    return false;
  };

  // Function to reset the board
  const resetBoard = () => {
    board = ["", "", "", "", "", "", "", "", ""];
  };

  return { getBoard, updateBoard, resetBoard };
})();

// Player Factory Function
const Player = (marker) => {
  const getMarker = () => marker;
  return { getMarker };
};

// Game Controller Module
const GameController = (() => {
  const player1 = Player("X");
  const player2 = Player("O");
  let currentPlayer = player1;
  let gameEnd = false;

  // Function to switch turns
  const switchPlayer = () => {
    currentPlayer = currentPlayer === player1 ? player2 : player1;
  };

  // Function to check for a winner
  const checkWinner = () => {
    const board = Gameboard.getBoard();
    const winConditions = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8], // Rows
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8], // Columns
      [0, 4, 8],
      [2, 4, 6], // Diagonals
    ];

    for (const condition of winConditions) {
      const [a, b, c] = condition;
      if (board[a] !== "" && board[a] === board[b] && board[a] === board[c]) {
        return true; // We have a winner
      }
    }
    return false; // No winner yet
  };

  // Function to handle button clicks
  const handleMove = (index) => {
    if (!gameEnd && Gameboard.updateBoard(index, currentPlayer.getMarker())) {
      if (checkWinner()) {
        gameEnd = true;
        alert(`Player ${currentPlayer.getMarker()} Won!`);
        resetGame();
      } else {
        switchPlayer(); // No winner, switch to next player
      }
    }
  };

  // Function to reset the game
  const resetGame = () => {
    Gameboard.resetBoard();
    currentPlayer = player1;
    gameEnd = false;
  };

  return { handleMove, resetGame };
})();

// UI Module to interact with DOM
const DisplayController = (() => {
  const container = document.getElementById("game-container");
  const buttonArray = container.querySelectorAll("button");

  // Add event listeners to each button
  buttonArray.forEach((button, index) => {
    button.addEventListener("click", () => {
      GameController.handleMove(index);
      updateDisplay();
    });
  });

  // Function to update the display after each move
  const updateDisplay = () => {
    const board = Gameboard.getBoard();
    buttonArray.forEach((button, index) => {
      button.innerHTML = board[index];
    });
  };

  // Function to reset the display (e.g., when resetting the game)
  const resetDisplay = () => {
    GameController.resetGame();
    updateDisplay();
  };

  return { updateDisplay, resetDisplay };
})();

// Initialize the display and game
DisplayController.updateDisplay();
