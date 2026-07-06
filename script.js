const txtName1 = document.querySelector("#p1name");
const txtName2 = document.querySelector("#p2name");
const msgBox = document.querySelector("#msgbox");

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

function newGame() {
  renderBoard();
}

document.querySelector("#btnstart").addEventListener("click", (event) => {
  const p1checked = document.querySelector('input[name="p1"]:checked');
  const p2checked = document.querySelector('input[name="p2"]:checked');
  if (txtName1.value != "" && txtName1.value != "" && p1checked && p2checked)
    newGame();
  else {
    event.preventDefault();
    msgBox.textContent = "Enter in all requested values.";
  }
});
