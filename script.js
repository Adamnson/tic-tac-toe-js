function GameBoard() {
  const rows = 3;
  const columns = 3;
  const board = [];
  let row_sums = [0,0,0]; /* row-0, row-1, row-2 */
  let col_sums = [0,0,0]; /* col-0, col-1, col-2 */
  let diag_sums = [0,0];  /* diag-0 diag-1*/
  let x_count = 0;
  let o_count = 0;
  let play_area = document.createElement("div");
  document.querySelector('body').appendChild(play_area);
  play_area.setAttribute('class', 'play-area');

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
      (player.mark==='x') ? x_count++ : o_count++;
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

  function noWinner() {
    return (x_count + o_count === 9)
  }

  // function getBoard(){
  //   return board;
  // }

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
   markCell, getLineSums, displayBoard, noWinner
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
  btn.style.color = 'whitesmoke';
  btn.style.backgroundColor = "whitesmoke";
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

  board = GameBoard();
  game_buttons = Array.from(document.querySelectorAll('button'));
  game_buttons.forEach(btn => 
    { btn.addEventListener("click",  (ev) => nextMove(ev));
    });

  function nextMove(ev){
    let ids = logId(ev);
    let valid_click = board.markCell(ids.row, ids.col, current_player);
    board.displayBoard();
    /* check if player won */
    let win_flag = getWinningPlayer(current_player)
    if (win_flag || board.noWinner() ) { 
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
    const score_match = (el) => el === adj_score;
    if(scores.row_sums.some(score_match)) {
      declareVictory(`.row-${scores.row_sums.indexOf(adj_score)}`);
      return true;
    } else if(scores.col_sums.some(score_match)) {
      declareVictory(`.col-${scores.col_sums.indexOf(adj_score)}`, plr.id);
      return true;
    } else if(scores.diag_sums.some(score_match)) {
      declareVictory(`.diag-${scores.diag_sums.indexOf(adj_score)}`, plr.id);
      return true;
    }
    return false;
  }

  function declareVictory(identifier, pid){
    console.log(`Player-${pid} won`);
    console.log(identifier);
    let cell_array = Array.from(document.querySelectorAll(identifier));
      cell_array.forEach(el => {el.style.backgroundColor = "green";})
  }

  function switchPlayer() {
    current_player = (current_player === players[0]) ? players[1] : players[0];
  }

}

GameController();
