const gameboard = (() => {
  let board = ["", "", "", "", "", "", "", "", ""];
  const getBoard = () => board;
  const placeMarker = (target, marker) => {
    if (target != "") {
      if (marker == "X") board[target - 1] = "X";
      else if (marker = "O") board[target - 1] = "O";
    }
  }
  return { getBoard, placeMarker };
})();

function createPlayer(name, marker, score) {
  return { name, marker, score };
}

const winConditions = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
  [1, 4, 7],
  [2, 5, 8],
  [3, 6, 9],
  [1, 5, 9],
  [3, 5, 7]
];