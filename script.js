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
  let row_sums = [0,0,0]; /* row-0, row-1, row-2 */
  let col_sums = [0,0,0]; /* col-0, col-1, col-2 */
  let diag_sums = [0,0];  /* diag-0 diag-1*/
  /* horizontal/ diagonals / veritical */
  /* const lines =[ ["00", "01", "02"], ["10", "11", "12"], ["20", "21", "22"], 
                 ["00", "11", "22"], ["20", "11", "02"],  
                 ["00", "10", "20"], ["01", "11", "21"], ["02", "12", "22"] ] */
  let play_area = document.createElement("div");
  document.querySelector('body').appendChild(play_area);
  play_area.setAttribute('class', 'play-area');
  console.log(play_area);

  for (let i = 0; i < rows; i++){
    board[i] = [];
    let temp_row = document.createElement("div");

    for (let j = 0; j < columns; j++){
      board[i].push(Cell());
      temp_row.appendChild(createAndStyleButtons(i,j).btn);
    }
    play_area.appendChild(temp_row);
  }

  function markCell(row, cell, player) {
    let cell_to_fill = board[row][cell];
    if (!cell_to_fill.filled) {
      /* game objects logic */
      cell_to_fill.filled = true;
      cell_to_fill.mark = player.mark;
      cell_to_fill.player = player.id;
      /* game score logic */
      row_sums[row] += player.weight;
      col_sums[cell] += player.weight;
      if (row==cell) {diag_sums[0]+= player.weight;}
      if (row+cell==2) {diag_sums[1]+= player.weight;}
      /* html logic */
      let btn = document.getElementById(`btn-${row}${cell}`);
      btn.innerHTML = player.mark;
      btn.style.color = player.color;
      btn.style.backgroundColor = "blanchedalmond";
      return true;
    } else { return false}
  }
  
  function getLineSums() {
    return {row_sums, col_sums, diag_sums}
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
    getBoard, displayBoard, markCell, getLineSums
  }
}

function createAndStyleButtons(i,j){
  /* html logic */
  let btn = document.createElement("button");
  btn.innerHTML = '-';
  btn.setAttribute('id',`btn-${i}${j}`);
  btn.classList.add( `row-${i}`);
  btn.classList.add(`col-${j}`);
  if (i==j) {btn.classList.add('diag-0');}
  if (i+j==2){btn.classList.add('diag-1');}
  /* css logic */
  btn.style.minHeight = "2rem";
  btn.style.padding = "1rem";
  btn.style.margin = "0.5rem";
  btn.style.borderRadius = "10%";
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
      name: 'Player 1',
      color: "yellow",
      weight: 1
    },
    {
      id: 2,
      mark: 'o',
      name: 'Player 2',
      color: "skyblue",
      weight: -1
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
    let valid_click = board.markCell(ids.row, ids.col, current_player);
    /* check if player won */
    let win_flag = getWinningPlayer(current_player)
    if (win_flag) { 
      disableGame();
      return;}
    if (valid_click ) { switchPlayer()}
  }

  function disableGame() {
    let btns = document.querySelectorAll("button");
    btns.forEach ((el) => {el.disabled = true;})
  }

  function getWinningPlayer(plr) {
    let adj_score = 3 * plr.weight;
    scores = board.getLineSums()
    // console.log(scores.row_sums);
    // console.log(scores.col_sums);
    // console.log(scores.diag_sums);
    const score_match = (el) => el === adj_score;
    if(scores.row_sums.some(score_match)) {
      console.log(`Player-${plr.id} won`);
      console.log(`row-${scores.row_sums.indexOf(adj_score)}`);
      let rows_to_color = Array.from(document.querySelectorAll(`.row-${scores.row_sums.indexOf(adj_score)}`));
      rows_to_color.forEach(el => {el.style.backgroundColor = "green";})
      return true;
    } else if(scores.col_sums.some(score_match)) {
      console.log(`Player-${plr.id} won`);
      console.log(`col-${scores.col_sums.indexOf(adj_score)}`);
      let cols_to_color = Array.from(document.querySelectorAll(`.col-${scores.col_sums.indexOf(adj_score)}`));
      cols_to_color.forEach(el => {el.style.backgroundColor = "green";})
      return true;
    } else if(scores.diag_sums.some(score_match)) {
      console.log(`Player-${plr.id} won`);
      console.log(`diag-${scores.diag_sums.indexOf(adj_score)}`);
      let diag_to_color = Array.from(document.querySelectorAll(`.diag-${scores.diag_sums.indexOf(adj_score)}`));
      diag_to_color.forEach(el => {el.style.backgroundColor = "green";})
      return true;
    }
    return false;
  }

  function switchPlayer() {
    current_player = (current_player === players[0]) ? players[1] : players[0];
  }

}

GameController();
