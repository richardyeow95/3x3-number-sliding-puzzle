// script.js
const container = document.getElementById("puzzle-container");
const message = document.getElementById("message");
let tiles = [];

function createTiles() {
  tiles = [...Array(8).keys()].map(n => n + 1);
  tiles.push(0); // 0 represents the empty tile
}

function renderTiles() {
  container.innerHTML = "";
  tiles.forEach((num, i) => {
    const tile = document.createElement("div");
    tile.className = "tile";
    if (num !== 0) {
      tile.textContent = num;
      tile.onclick = () => tryMove(i);
    }
    container.appendChild(tile);
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

function isSolvable(arr) {
  let invCount = 0;
  for (let i = 0; i < 8; i++) {
    for (let j = i + 1; j < 9; j++) {
      if (arr[i] && arr[j] && arr[i] > arr[j]) invCount++;
    }
  }
  return invCount % 2 === 0;
}

function isSolved() {
  return tiles.slice(0, 8).every((n, i) => n === i + 1);
}

function checkWin() {
  if (isSolved()) {
    message.textContent = "🎉 You solved the puzzle!";
  }
}

createTiles();
shuffleTiles();
