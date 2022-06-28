const BOARD = document.getElementById("game-body");
const SYMBOLS = ["🔵", "❌"];
const TIMEOUT = 400;
const TIMEOUT_GEN = 120;
let players = ["", ""];
let canPlay = false;
let playerTurn = 0;

function generateBoard() {
  BOARD.style.display = "block";
  BOARD.innerHTML = "";
  let count = 0;
  let interval = setInterval(() => {
    BOARD.innerHTML += `<button onclick="putSymbol(this)" class="game-button">⬜</button>`;
    count++;
    if (count > 8) {
      clearInterval(interval);
      canPlay = true;
      let buttonsAnimate = document.querySelectorAll(".game-button");
      buttonsAnimate.forEach((button) => {
        button.classList.add("animate-btn");
      });
    }
  }, TIMEOUT_GEN);
}

function putSymbol(argthis) {
  if (canPlay && argthis.innerHTML == "⬜") {
    argthis.innerHTML = `<span class="animate">${SYMBOLS[playerTurn]}</span>`;
    argthis.classList.add(`${playerTurn}`);
    argthis.classList.add("marked");
    if (!checkWinner()) changePlayer();
  }
}

function changePlayer() {
  const PLAYER = document.getElementById("playerturn");
  playerTurn++;
  if (playerTurn > 1) playerTurn = 0;
  if (PLAYER.style.display == "block") {
    PLAYER.innerHTML = `Player in turn: ${players[playerTurn]} ${SYMBOLS[playerTurn]}`;
  }
}

function checkWinner(argthis) {
  const WINNER = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  const BUTTONS = document.querySelectorAll(".game-button");
  for (i in WINNER) {
    if (
      BUTTONS[WINNER[i][0]].classList.contains(`${playerTurn}`) &&
      BUTTONS[WINNER[i][1]].classList.contains(`${playerTurn}`) &&
      BUTTONS[WINNER[i][2]].classList.contains(`${playerTurn}`)
    ) {
      canPlay = false;
      setTimeout(() => {
        endGame(0);
      }, TIMEOUT);
      BUTTONS[WINNER[i][0]].classList.add("winner");
      BUTTONS[WINNER[i][1]].classList.add("winner");
      BUTTONS[WINNER[i][2]].classList.add("winner");
      return true;
    }
  }
  checkDraw(BUTTONS);
  return false;
}

function checkDraw(buttonsArg) {
  let marked = 0;
  for (i = 0; i < buttonsArg.length; i++) {
    if (buttonsArg[i].classList.contains("marked")) marked++;
  }

  if (marked >= 9) {
    setTimeout(() => {
      endGame(1);
    }, TIMEOUT);
  }
}

function endGame(type) {
  let cardmsg = document.getElementById("card-message");
  document.getElementById("game-modal").style.display = "flex";
  cardmsg.innerHTML = "";
  cardmsg.innerHTML = `<p>Draw</p>`;
  if (type == 0) {
    // 0 significa que alguem ganhou
    cardmsg.innerHTML = `<p>${SYMBOLS[playerTurn]} ${players[playerTurn]} won ${SYMBOLS[playerTurn]}</p>`;
  }
}

function reset() {
  generateBoard();
  canPlay = true;
  changePlayer();
  document.getElementById("game-modal").style.display = "none";
}

function setPlayerName() {
  const TIMEOUT_1 = TIMEOUT_GEN * 15;
  let inputs = document.querySelectorAll(".inputplayer");

  if (inputs[0].value != inputs[1].value) {
    players[0] = inputs[0].value;
    players[1] = inputs[1].value;
  } else {
    let warning = document.getElementById("input-warning");
    warning.style.visibility = "visible";
    setTimeout(() => {
      warning.style.visibility = "hidden";
    }, TIMEOUT_1);
  }

  if (players[0] != "" && players[1] != "") {
    inputs.forEach((inp) => {
      inp.style.display = "none";
    });
    document.getElementById("playerbtn").style.display = "none";

    document.getElementById(
      "playerinfo"
    ).innerHTML += `<p id="player-callback">Player setup successful</p>`;
    generateBoard();
    setTimeout(() => {
      document.getElementById("player-callback").style.display = "none";
      document.getElementById("playerturn").style.display = "block";
      document.getElementById(
        "playerturn"
      ).innerHTML = `Player in turn: ${players[playerTurn]} ${SYMBOLS[playerTurn]}`;
    }, TIMEOUT_1);
  }
}
