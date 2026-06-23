const gameboard = (() => {
  const board = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
  const getBoard = () => board;
  const placeMarker = (target, marker) => {
    if (target != "") {
      if (marker == "X") board[target - 1] = "X";
      else if (marker = "O") board[target - 1] = "O";
    }
  }
  return { getBoard, placeMarker };
})();

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

function createPlayer(name, marker, moves) {
  return { name, marker, moves };
}

function printBoard(b) {
  console.log(`${b[0]}|${b[1]}|${b[2]}
${b[3]}|${b[4]}|${b[5]}
${b[6]}|${b[7]}|${b[8]}`);  
}

const rl = require("node:readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

function playerTurn(player) {
  printBoard(gameboard.getBoard());
  rl.question(`${player.name} (${player.marker}) choose cell: `, move => {
    if (Number(move) != NaN) {
      gameboard.placeMarker(move, player.marker);
      console.log("\n-----\n");
      rl.close();
    }
  });
}

playerTurn(createPlayer("p1", "X"));
