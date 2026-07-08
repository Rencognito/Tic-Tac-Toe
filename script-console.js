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
      else if ((marker = "O")) board[target - 1] = "O";
    }
  };
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
  [3, 5, 7],
];

function printBoard(b) {
  console.log(`${b[0]}|${b[1]}|${b[2]}
${b[3]}|${b[4]}|${b[5]}
${b[6]}|${b[7]}|${b[8]}`);
}

function checkWin(player) {
  const moves = player.moveList;
  for (let i = 0; i < winConditions.length; i++) {
    let conditionMet = winConditions[i].every((element) =>
      moves.includes(element),
    );
    if (conditionMet) {
      player.score++;
      console.log(`${player.name} wins!`);
      printBoard(gameboard.getBoard());
      return true;
      break;
    }
  }
}

async function playerTurn(player) {
  while (true) {
    printBoard(gameboard.getBoard());
    const move = await takeInput(
      `${player.name} (${player.marker}) choose cell (1-9): `,
    );
    if (Number(move) != NaN && 1 <= Number(move) <= 9) {
      gameboard.placeMarker(move, player.marker);
      player.moveList.push(Number(move));
      console.log("-----");
      break;
    } else {
      console.log("Input invalid");
    }
  }
  return checkWin(player);
}
const printScore = (pX, pO) =>
  console.log(`${pX.name}-${pX.score} | ${pO.score}-${pO.name}`);

async function newGame() {
  const playerX = await createX(undefined, "X", [], 0);
  const playerO = await createX(undefined, "O", [], 0);
  let turnCount = 0;
  let xTurn;
  let oTurn;
  while (true) {
    if (turnCount < 9) {
      xTurn = await playerTurn(playerX);
      turnCount++;
      if (xTurn) {
        printScore(playerX, playerO);
        rl.close();
        break;
      }
    }
    if (turnCount < 9) {
      oTurn = await playerTurn(playerO);
      turnCount++;
      if (oTurn) {
        printScore(playerX, playerO);
        rl.close();
        break;
      }
    }
    if (turnCount === 9 && !xTurn && !oTurn) {
      console.log("Draw!");
      printScore();
      rl.close();
      break;
    }
  }
}
newGame();
