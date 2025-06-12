/*
* we are making a tic tac toe game
*(done) we need a board with 9 cells - cells will be buttons 
*(done) there should be a board object
*(done)    board will have 3 rows  - each row 3 cells
*(done) we need player objects : name, mark, score
*(done) cell object will hold state : filled/empty
*(done) cell object will hold mark/player id 
*/

function GameBoard() {
  const rows = 3;
  const columns = 3;
  const board = [];
  let play_area = document.createElement("div");
  document.querySelector('body').appendChild(play_area);
  play_area.setAttribute('class', 'play-area');
  console.log(play_area);

  for (let i = 0; i < rows; i++){
    board[i] = [];
    let temp_row = document.createElement("div");
    temp_row.setAttribute("class", `row-${i}`);

    for (let j = 0; j < columns; j++){
      board[i].push(Cell());
      temp_row.appendChild(createAndStyleButtons(i,j).btn);
    }
    play_area.appendChild(temp_row);

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
      row_val = " ";
    }
  }
  return {
    getBoard, displayBoard, markCell
  }
}

function createAndStyleButtons(i,j){
  let btn = document.createElement("button");
  btn.setAttribute('id',`btn-${i}${j}`);
  btn.addEventListener("click", (ev) => console.log(ev.target.id));
  btn.style.minHeight = "2rem";
  btn.style.padding = "1rem";
  btn.style.margin = "0.5rem";
  return {btn}
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