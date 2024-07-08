import "./index.css";
import board, { BoardInterface } from "./factories/board";
import {
  player,
  computerPlayer,
  PlayerInterface,
  ComputerInterface,
} from "./factories/player";
import ship, { ShipInterface } from "./factories/ship";
import {
  generateCell,
  displayShip,
  addRowToboard,
  displayHit,
} from "./display/board";

let playerOne: undefined | PlayerInterface | ComputerInterface;
let PlayerTwo: undefined | PlayerInterface | ComputerInterface;

const Boardsize = 10;

const boardOne = board();
const boardTwo = board();

const generateShips = () => [
  ship("carrier"),
  ship("battleship"),
  ship("cruiser"),
  ship("submarine"),
  ship("destroyer"),
];

const test = ship("carrier");
function startGame() {}

function selectPlayer() {}

function restartGame() {}
function selectShip() {}

function placeShip() {}

function changeOrientation() {}

function receiveAttack(
  x: number,
  y: number,
  board: BoardInterface,
  cell: HTMLDivElement
) {
  const success = board.receiveAttack(x, y);
  if (!success) return;
  displayHit(cell);
  if (board.gameOver()) {
    alert("game over");
  }
}

function randomPlacement(
  ships: ShipInterface[],
  board: BoardInterface,
  boardID: string
) {
  let placed = 0;
  while (placed < ships.length) {
    const randomX = Math.floor(Math.random() * 10);
    const randomY = Math.floor(Math.random() * 10);
    const locations = board.placeShip(
      ships[placed],
      { x: randomX, y: randomY },
      placed % 2 === 0 ? "horizontal" : "vertical"
    );

    if (typeof locations === "object") {
      displayShip(boardID, locations);
      placed += 1;
    }
  }
}

function generateBoard(boardID: string, board: BoardInterface) {
  for (let y = 0; y < Boardsize; y += 1) {
    const row = [];
    for (let x = 0; x < Boardsize; x += 1) {
      const cell = generateCell(x, y, boardID);
      cell.addEventListener("click", () => receiveAttack(x, y, board, cell));
      row.push(cell);
    }
    addRowToboard(row, boardID);
  }
}

generateBoard("player-one-board", boardOne);
generateBoard("player-two-board", boardTwo);
randomPlacement(generateShips(), boardOne, "player-one-board");
randomPlacement(generateShips(), boardTwo, "player-two-board");
