const GRID = [
  ["", "", "", "^", "", "", "", "", "", ""],
  ["", "", "v", "", "~", "", "", "", "", ""],
  ["", "v", "", "", "^", "^", "", "", "", ""],
  ["", "", "", "", "^", "^", "", "", "", ""],
  ["", "", "", "", "", "", "", "", "v", ""],
  ["", "", "", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", "", "", ""],
  ["", "^", "~", "~", "", "", "", "^", "", ""],
  ["", "^", "", "~", "~", "", "", "", "", ""],
  ["", "^", "", "", "~", "~", "", "", "", ""],
];

function countRows() {
  return GRID.length;
}

function countColumns() {
  return GRID[0].length;
}

function gridSize() {
  return (countColumns() + " x " + countRows());
}

function totalCells() {
  return (countColumns() * countRows());
}

function convertColumn(location) {
  var char = location[0].toLowerCase();
  return (char.charCodeAt(0) - 97);
}

function isRock(location) {
  return (lightCell(location) == "^" ? true : false);
}

function isCurrent(location) {
  return (lightCell(location) == "~" ? true : false);
}

function isShip(location) {
  return (lightCell(location) == "v" ? true : false);
}

function lightRow(rowNum) {
  return (GRID[rowNum - 1]);
}

function lightColumn(column) {
  var columnContents = [];
  var char = column.toLowerCase();
  var columnNum = char.charCodeAt(0) - 97;
  GRID.map(e => {
    columnContents.push(e[columnNum]);
  });
  return columnContents;
}

// Returns content of cell and false if cell doesn't exist
function lightCell(location) {
  var row = parseInt(location.slice(1));
  var columnIndex = convertColumn(location);
  var numOfColumns = countColumns();
  var numOfRows = countRows();

  if (numOfRows < row || numOfColumns < (columnIndex + 1)) {
    return false;
  } else {
    return GRID[row - 1][columnIndex];
  }
}

// GRID[0] is required to determin how many columns the GRID has
function allRocks() {
  let rocks = [];
  for (let i = 0; i < GRID.length; i++) {
    for (let j = 0; j < GRID[0].length; j++) {
      let e = GRID[i][j];
      if (e === "^") {
        let location = `${String.fromCharCode(j + 65)}${i + 1}`;
        rocks.push(location);
      }
    }
  }
  return rocks;
}

// GRID[0] is required to determin how many columns the GRID has
function allCurrents() {
  let currents = [];
  for (let i = 0; i < GRID.length; i++) {
    for (let j = 0; j < GRID[0].length; j++) {
      let e = GRID[i][j];
      if (e === "~") {
        let location = `${String.fromCharCode(j + 65)}${i + 1}`;
        currents.push(location);
      }
    }
  }
  return currents;
}

// GRID[0] is required to determin how many columns the GRID has
function allShips() {
  let ships = [];
  for (let i = 0; i < GRID.length; i++) {
    for (let j = 0; j < GRID[0].length; j++) {
      let e = GRID[i][j];
      if (e === "v") {
        let location = `${String.fromCharCode(j + 65)}${i + 1}`;
        ships.push(location);
      }
    }
  }
  return ships;
}

function firstRock() {
  var rocks = allRocks();
  return rocks[0];
}

function firstCurrent() {
  var currents = allCurrents();
  return currents[0];
}

// Furthest west and east boats
function shipReport() {
  let result = [];
  const ships = allShips().sort();
  result.push(ships.shift());
  result.push(ships.pop());
  return result;
}

function howDangerous(location) {
  const cell = lightCell(location);
  switch (cell) {
    case false:
      return 0;

    case '':
      return 0;

    case '~':
      return 50;

    case '^':
      return 100;
  }
}

function percentageReport() {
  const numOfCells = totalCells();
  const perOfRocks = (allRocks().length / numOfCells) * 100;
  const perOfCurrents = (allCurrents().length / numOfCells) * 100;
  const result = [parseFloat(perOfRocks.toFixed(2)), parseFloat(perOfCurrents.toFixed(2))];

  return result;
}

percentageReport();

module.exports = {
  countRows,
  countColumns,
  gridSize,
  totalCells,
  convertColumn,
  lightCell,
  isRock,
  isCurrent,
  isShip,
  lightRow,
  lightColumn,
  lightCell,
  allRocks,
  allCurrents,
  allShips,
  firstRock,
  firstCurrent,
  shipReport,
  howDangerous,
  percentageReport,
}