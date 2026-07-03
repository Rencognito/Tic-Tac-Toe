const main = document.querySelector("main");

const gameboard = (() => {
  const board = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
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
  main.innerHTML = "";
  const board = gameboard.getBoard();
  const boardContainer = document.createElement("div");
  boardContainer.classList.add("board");
  for (let i = 0; i < board.length; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.setAttribute("id", board[i]);
    main.appendChild(cell);
  }
}

renderBoard();
