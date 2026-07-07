const msgBox = document.querySelector("#msgbox");

function createPlayer(event) {
  const name1 = document.querySelector("#p1name").value;
  const name2 = document.querySelector("#p2name").value;
  const p1Marker = document.querySelector('input[name="p1"]:checked')?.value;
  const p2Marker = document.querySelector('input[name="p2"]:checked')?.value;
  if (name1.trim() != "" && name2.trim() != "" && p1Marker !== p2Marker) {
    return {
      player1: {
        name: name1,
        marker: p1Marker,
        moveList: [],
        score: 0,
      },
      player2: {
        name: name2,
        marker: p2Marker,
        moveList: [],
        score: 0,
      },
    };
  } else {
    msgBox.textContent = "Enter in the requested values";
    event.preventDefault();
    return false;
  }
}

const gameboard = (() => {
  const board = ["", "", "", "", "", "", "", "", ""];
  const getBoard = () => board;
  const placeMarker = (target, marker) => {
    if (target != "") {
      if (marker == "X") board[target - 1] = "X";
      else if ((marker = "O")) board[target - 1] = "O";
    }
  };
  return { getBoard, placeMarker };
})();

function renderBoard() {
  const main = document.querySelector("main");
  main.innerHTML = "";

  const board = gameboard.getBoard();
  const gbContainer = document.createElement("div");
  gbContainer.classList.add("board");
  main.appendChild(gbContainer);

  for (let i = 0; i < board.length; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.setAttribute("id", board[i]);
    gbContainer.appendChild(cell);
  }
}

function gameController(event) {
  const players = createPlayer(event);
  if (players) {
    let p1 = createPlayer().player1;
    let p2 = createPlayer().player2;
    console.log(players);
    renderBoard();
  }
}

document.querySelector("#btnstart").addEventListener("click", (e) => {
  gameController(e);
});
