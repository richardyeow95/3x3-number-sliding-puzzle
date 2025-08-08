const puzzleContainer = document.getElementById("puzzle-container");
const message = document.getElementById("message");

let tiles = [8, 1, 6, 0, 5, 7, 4, 2, 3];

function renderTiles() {
  puzzleContainer.innerHTML = "";
  tiles.forEach((num, i) => {
    const tile = document.createElement("div");
    tile.className = "tile";
    tile.setAttribute("draggable", true);
    tile.dataset.index = i;

    if (num !== 0) {
      tile.textContent = num;
      tile.onclick = () => tryMove(i);
    }

    tile.ondragstart = e => {
      e.dataTransfer.setData("text/plain", i);
    };

    tile.ondragover = e => {
      e.preventDefault();
    };

    tile.ondrop = e => {
      e.preventDefault();
      const fromIndex = parseInt(e.dataTransfer.getData("text/plain"));
      const toIndex = parseInt(tile.dataset.index);
      trySwap(fromIndex, toIndex);
    };

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

function trySwap(fromIndex, toIndex) {
  const emptyIndex = tiles.indexOf(0);
  if (toIndex === emptyIndex || fromIndex === emptyIndex) {
    [tiles[fromIndex], tiles[toIndex]] = [tiles[toIndex], tiles[fromIndex]];
    renderTiles();
    checkWin();
  }
}

function isSolved() {
  return tiles.slice(0, 8).every((n, i) => n === i + 1);
}

function checkWin() {
  if (isSolved()) {
    message.textContent = "🎉 You solved the puzzle!";
  }
}

// Load fixed starting position immediately
renderTiles();
