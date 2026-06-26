import { createInterface } from "node:readline";

const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
});

function takeInput(input) {
  return new Promise((resolve) => {
    rl.question(input, (answer) => {
      resolve(answer);
    });
  });
}

async function createX(name, marker, moveList, score) {
  name = await takeInput(`Enter player (${marker}) name: `);
  return { name, marker, moveList, score };
}
async function createO(name, marker, moveList, score) {
  name = await takeInput(`Enter player (${marker}) name: `);
  return { name, marker, moveList, score };
}

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


function printBoard(b) {
  console.log(`${b[0]}|${b[1]}|${b[2]}
${b[3]}|${b[4]}|${b[5]}
${b[6]}|${b[7]}|${b[8]}`);  
}


function checkWin(player) {
  const moves = player.moveList.toString();
  for (let i = 0; i < winConditions.length; i++) {
    if (moves.includes(i.toString())) {
      playerX.score++;
      console.log(`${playerX.name} wins!`);
      printBoard(gameboard.getBoard());
      return true;
      break;
    }
    else {
      return false;
      break;
    }
  }
}

async function playerTurn(player) {
  printBoard(gameboard.getBoard());
  const move = await takeInput(`${player.name} (${player.marker}) choose cell: `);
  if (Number(move) != NaN) {
    gameboard.placeMarker(move, player.marker);
    player.moveList.push(Number(move));
    console.log("\n-----\n");
  }
  checkWin(player);
}

async function newGame() {
  const playerX = await createX(undefined, "X", [], 0);
  const playerO = await createX(undefined, "O", [], 0);
}
newGame();