/*
* we are making a tic tac toe game
*(done) we need a board with 9 cells - cells will be buttons 
*(done) there should be a board object
*(done)    board will have 3 rows  - each row 3 cells
*(done) we need player objects : name, mark, score
*(done) cell object will hold state : filled/empty
*(done) cell object will hold mark/player id 
* make a game controller
* 1. controller will by default assign first turn to player 1
* 2. when player clicks on a button, controller will mark it
* 3. controller will check if the player has won, if not
* 4a. controller will pass the turn to other player
* 5. repeat step 2 onwards
* 4b. if a player has won, the controller will display congrats
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
    let btn = document.getElementById(`btn-${row}${cell}`);
      btn.innerHTML = player.mark;
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
  btn.style.minHeight = "2rem";
  btn.style.padding = "1rem";
  btn.style.margin = "0.5rem";
  btn.innerHTML = '-';
  return {btn}
}

function Cell(){
  let filled = false;
  let mark = ' ';
  let player = 0;

  return {filled, mark, player}
}

function GameController() {

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

  let current_player = players[0];
  
  function logId(event) {
    let btn_id = event.target.id;
    console.log(`${btn_id} was pressed`);
    let row = parseInt(btn_id.at(-2));
    let col =  parseInt(btn_id.at(-1));
    return {row,col}
  }

  board = GameBoard()
  game_buttons = Array.from(document.querySelectorAll('button'));
  game_buttons.forEach(btn => 
    { btn.addEventListener("click",  (ev) => nextMove(ev));
    });

    function nextMove(ev){
      let ids = logId(ev);
      board.markCell(ids.row, ids.col, current_player);
      current_player = (current_player === players[0]) ? players[1] : players[0];
    }
}

GameController();
