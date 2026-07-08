const msgBox = document.querySelector("#msgbox");
let inputtedCell, currentPlayer;

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
  document.querySelector("main").addEventListener("click", (e) => {
    if (e.target.classList.contains("cell")) {
      inputtedCell = e.target.id;
      displayController().placeMarker(e.target, currentPlayer.marker);
    }
  });

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
    document.querySelector("#p1score").textContent = p2.score;
  };

  return { renderBoard, placeMarker, updateNames, updateScore };
}

function gameController() {
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

  const playerTurn = (player) => {
    msgBox.textContent = `Your turn, ${player.name} (${player.marker})`;
  };

  const newGame = (event) => {
    const players = createPlayer(event);
    if (players) {
      let p1 = players.player1,
        p2 = players.player2,
        turnCount = 0;
      displayController().updateNames(p1, p2);

      displayController().renderBoard();
      currentPlayer = p1;
      playerTurn(currentPlayer);
    }
  };

  return { createPlayer, newGame };
}

document.querySelector("#btnstart").addEventListener("click", (e) => {
  gameController().newGame(e);
});
