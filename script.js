const msgBox = document.querySelector("#msgbox");
let currentPlayer;
let players = null;
let didWin = false;

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

function displayController() {
  const renderBoard = () => {
    const board = gameboard.getBoard();
    const main = document.querySelector("main");
    const gbContainer = document.createElement("div");

    main.innerHTML = "";
    gbContainer.classList.add("board");
    main.appendChild(gbContainer);

    for (let i = 0; i < board.length; i++) {
      let cell = document.createElement("div");
      cell.classList.add("cell");
      cell.id = `${i + 1}`;
      gbContainer.appendChild(cell);
    }
  };

  const placeMarker = (target, marker) => {
    if (target.textContent === "") target.textContent = marker;
  };

  const updateNames = (p1, p2) => {
    document.querySelector("#p1n").textContent = p1.name;
    document.querySelector("#p2n").textContent = p2.name;
  };

  const updateScore = (p1, p2) => {
    document.querySelector("#p1score").textContent = p1.score;
    document.querySelector("#p2score").textContent = p2.score;
  };

  return { renderBoard, placeMarker, updateNames, updateScore };
}

function gameController() {
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

  const createPlayer = (event) => {
    const name1 = document.querySelector("#p1name").value,
      name2 = document.querySelector("#p2name").value,
      p1Marker = document.querySelector('input[name="p1"]:checked')?.value,
      p2Marker = document.querySelector('input[name="p2"]:checked')?.value;
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
  };

  const playerTurn = (cell) => {
    if (!currentPlayer || !players) return;
    
    if (cell.textContent === "") {
      const move = Number(cell.id);
      currentPlayer.moveList.push(move);
      displayController().placeMarker(cell, currentPlayer.marker);
      console.log(currentPlayer.moveList);
      if (!checkWin()) {
        currentPlayer =
          currentPlayer === players.player1 ? players.player2 : players.player1;
          msgBox.textContent = `Your turn, ${currentPlayer.name} (${currentPlayer.marker})`;
      } else {
        didWin = true;
        msgBox.textContent = `${currentPlayer.name} wins!`;
        currentPlayer.score++;
        displayController().updateScore(players.player1, players.player2);
      }
    }
  };

  const checkWin = () => {
    for (let i = 0; i < winConditions.length; i++) {
      const conditionMet = winConditions[i].every((element) =>
        currentPlayer.moveList.includes(element),
      );
      if (conditionMet) {
        return true;
      }
    }
    return false;
  };

  const newGame = (event) => {
    const createdPlayers = createPlayer(event);
    if (createdPlayers) {
      players = createdPlayers;
      const p1 = players.player1;
      const p2 = players.player2;
      displayController().updateNames(p1, p2);
      displayController().renderBoard();
      currentPlayer = p1;
      msgBox.textContent = `Your turn, ${currentPlayer.name} (${currentPlayer.marker})`;
    }
  };

  return { createPlayer, playerTurn, checkWin, newGame };
}

const game = gameController();

document.querySelector("main").addEventListener("click", (e) => {
  if (e.target.classList.contains("cell") && !didWin) {
    game.playerTurn(e.target);
  }
});

document.querySelector("#btnstart").addEventListener("click", (e) => {
  game.newGame(e);
});
