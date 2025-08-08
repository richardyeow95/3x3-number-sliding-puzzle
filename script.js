// script.js
const puzzleContainer = document.getElementById("puzzle-container");
const message = document.getElementById("message");
const gameScreen = document.getElementById("game-screen");
const startButton = document.getElementById("start-game");
const nextNumberSpan = document.getElementById("next-number");

let tiles = [];
let setupTiles = Array(9).fill(null);
let currentSetupIndex = 1;

function createTiles() {
  tiles = [...Array(8).keys()].map(n => n + 1);
  tiles.push(0);
}

// Fixed starting position
tiles = [8, 1, 6, 0, 5, 7, 4, 2, 3];
setupScreen.style.display = "none";
gameScreen.style.display = "block";
renderTiles();

function renderTiles() {
  puzzleContainer.innerHTML = "";
  tiles.forEach((num, i) => {
    const tile = document.createElement("div");
    tile.className = "tile";
    if (num !== 0) {
      tile.textContent = num;
      tile.onclick = () => tryMove(i);
    }
    puzzleContainer.appendChild(tile);
  });
}

function tryMove(index) {
  const emptyIndex = tiles.indexOf(0);
  const validMoves = [
    emptyIndex - 3,
    emptyIndex + 3,
    (emptyIndex % 3 !== 0) ? emptyIndex - 1 : -1,
    (emptyIndex % 3 !== 2) ? emptyIndex + 1 : -1,
  ];
  if (validMoves.includes(index)) {
    [tiles[emptyIndex], tiles[index]] = [tiles[index], tiles[emptyIndex]];
    renderTiles();
    checkWin();
  }
}

function shuffleTiles() {
  do {
    for (let i = tiles.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [tiles[i], tiles[j]] = [tiles[j], tiles[i]];
    }
  } while (!isSolvable(tiles) || isSolved());
  renderTiles();
  message.textContent = "";
}

function isSolved() {
  return tiles.slice(0, 8).every((n, i) => n === i + 1);
}

function checkWin() {
  if (isSolved()) {
    message.textContent = "🎉 You solved the puzzle!";
  }
}

