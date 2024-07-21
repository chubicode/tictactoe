//variable to keep tract of the current player starting with 'x'
let currentPlayer = 'X';
let gameEnded = false //variable to track if the game has ended

// Function to handle Player 1's move, setting the cell's text to 'X'
function currentPlayer1(cell) {
  cell.innerText = 'X';
}

// Function to handle Player 2's move, setting the cell's text to 'O'
function currentPlayer2(cell) {
  cell.innerText = 'O';
}


//Now lets get the logic for the tictactoe game
//we will start form getting the wingame function and the draw game funciton 

//function to check for a win 
function checkWin(player){

  const cell = document.querySelectorAll('td') //get all cells in the gameboard

  //now get the array of winning combinations (rows, columns, diagonals)
  const winningCombo = [

    // Rows
    [0, 1, 2], // First row
    [3, 4, 5], // Second row
    [6, 7, 8], // Third row

    // Columns
    [0, 3, 6], // First column
    [1, 4, 7], // Second column
    [2, 5, 8], // Third column

    // Diagonals
    [0, 4, 8], // Top-left to bottom-right diagonal
    [2, 4, 6]  // Top-right to bottom-left diagonal
  ]


  //The some() method of Array instances tests whether at least one element in the array passes the test implemented by the provided function. It returns true if, in the array, it finds an element for which the provided function returns true; otherwise it returns false. It doesn't modify the array.

  return winningCombo.some(combination => {
    
  //.every():
  //For each combination (which is an array of cell indices), the .every() method checks if all elements in the combination satisfy the condition.
  //The condition is that the innerText of the cell at the given index must be equal to the current player ('X' or 'O').
  //For each combination (like the first row), checks if all indices in the combination have the player's mark.
    return combination.every(index=>{
      return cell[index].innerText === player
    })
  })

// .some checks at least one combination is true
//.every checks if all elements in the combimation satisfy the condition that innerText is either x or o 

}

//funciton to check Draw

function checkDraw(){
  const cell = document.querySelectorAll('td') // get all cells


  //check if cells are filled 
  //change the nodelist to become array like and determine if all cells are filled 
  //Array.from(cells): Converts the NodeList into an actual array. This conversion is necessary because NodeList does not have all the array methods available (like every), and using Array.from allows you to use array methods on it.
  //Array.every(): This method tests whether all elements in the array pass the test implemented by the provided function. It returns true if the callback function returns true for all elements; otherwise, it returns false.

return Array.from(cell).every(cell=>{
  return cell.innerText !== ''
})
}


//function to start the Game 
function startGame(){

// Prevent starting the game again if it has already ended
if (gameEnded) return;
//change title to indicate game has started
document.getElementById('title').innerText ='Begin'
gameEnded = false

//add click event to each cell on the game board
document.querySelectorAll('td').forEach(cell=>{
  cell.innertText =''//clear previous marks
  cell.addEventListener('click', handleClick)
})

//remove the event listener for the key press after starting game 
document.removeEventListener('keydown', startGameOnKeyPress)
}


// Function to handle cell clicks
function handleClick(event) {
  if (gameEnded) return; // Prevent further moves if the game has ended
  const cell = event.target; //gets the cell that was clicked 
  // Check if the clicked cell is empty before marking it
  if (cell.innerText === '') {
    // If it's Player X's turn
    if (currentPlayer === 'X') {
      currentPlayer1(cell); // Mark the cell with 'X'
      // Check if Player X has won
      if (checkWin('X')) {
        document.getElementById('title').innerText = 'Player X Wins!'; // Update title
        endGame(); // End the game
      // Check if the game is a draw
      } else if (checkDraw()) {
        document.getElementById('title').innerText = 'Draw!'; // Update title
        endGame(); // End the game
      } else {
        currentPlayer = 'O'; // Switch to Player O
      }
    // If it's Player O's turn
    } else {
      currentPlayer2(cell); // Mark the cell with 'O'
      // Check if Player O has won
      if (checkWin('O')) {
        document.getElementById('title').innerText = 'Player O Wins!'; // Update title
        endGame(); // End the game
      // Check if the game is a draw
      } else if (checkDraw()) {
        document.getElementById('title').innerText = 'Draw!'; // Update title
        endGame(); // End the game
      } else {
        currentPlayer = 'X'; // Switch to Player X
      }
    }
  }
}

//fucntion to end game
function endGame(){

  gameEnded =true //mark the game as ended
//remove click event listeners from all cells 
document.querySelectorAll('td').forEach(cell=>{
  cell.removeEventListener('click', handleClick)
})


}

// Function to reload the page and restart the game
function restartGame(){

  location.reload()

}

//function to startGame on Keypress
function startGameOnKeyPress(){
  startGame()
}

//EventListener for any keypress to start the game 
document.addEventListener('keydown', startGameOnKeyPress)

//add Eventlistener for restart button to reload page
document.getElementById('btn-restart').addEventListener('click',restartGame)






