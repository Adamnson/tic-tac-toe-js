/*
* we are making a tic tac toe game
* we need a board with 9 cells - cells will be buttons 
* we need player objects : name, mark, score
* there should be a board object
*    board will have 3 rows  - each row 3 cells
* cell object will hold state : filled/empty
* cell object will hold mark/player id if filled   
*/

function GameBoard() {
  const rows = 3;
  const columns = 3;
  const board = [];

  for (let i = 0; i < rows; i++){
    board[i] = [];
    for (let j = 0; j < columns; j++){
      board[i].push(Cell());
    }
  }

  function markCell(row, cell, player) {
    let cell_to_fill = board[row][cell];
    cell_to_fill.filled = true;
    cell_to_fill.mark = player.mark;
    cell_to_fill.player = player.id;
  }

  function getBoard(){
    return board;
  }

  function displayBoard(){
    let row_val = " ";
    for (let i = 0; i < rows; i++){
      for(let j = 0; j < columns; j++){
        row_val += board[i][j].mark;
        row_val += " | "
      }
      console.log(row_val);
      // if (i < rows - 1) { console.log("----------"); }
      row_val = " ";
    }
  }
  return {
    getBoard, displayBoard, markCell
  }
}

function Cell(){
  let filled = false;
  let mark = ' ';
  let player = 0;

  return {filled, mark, player}
}

const players = [
  {
    id: 1,
    mark: 'x',
    name: 'Player 1'
  },
  {
    id: 2,
    mark: 'o',
    name: 'Player 2'
  }
]

brd = GameBoard()
brd.markCell(0,0,players[1])
brd.markCell(1,1,players[1])
brd.markCell(2,2,players[1])