import { ShipInterface } from "./ship";
export default function board(): BoardInterface {
  const size = 10;
  const generateBoard = () => {
    const boardArr = [];
    for (let outer = 0; outer < size; outer += 1) {
      const values = [];
      for (let inner = 0; inner < size; inner += 1) {
        const boardObject: { hit: boolean; ship: undefined | ShipInterface } = {
          hit: false,
          ship: undefined,
        };
        values[inner] = boardObject;
      }
      boardArr[outer] = values;
    }
    return boardArr;
  };

  let board = generateBoard();

  let ships: ShipInterface[] = [];

  const canPlace = (
    coordinates: { x: number; y: number },
    length: number,
    orientation: "horizontal" | "vertical"
  ) => {
    // check if its out of bounds and if there is a ship
    const locations = [];

    for (let i = 0; i < length; i++) {
      const xPosition = coordinates.x + (orientation === "horizontal" ? i : 0);
      const yPosition = coordinates.y + (orientation === "vertical" ? i : 0);
      const inbound =
        xPosition >= 0 &&
        xPosition < board.length &&
        yPosition >= 0 &&
        yPosition < board.length;

      if (inbound && !board[xPosition][yPosition].ship) {
        locations.push({ x: xPosition, y: yPosition });
      } else {
        return false;
      }
    }
    return locations;
  };

  const receiveAttack = (x: number, y: number) => {
    const location = board[x][y];
    if (location.hit) {
      return false;
    }
    location.hit = true;
    const ship: ShipInterface = location.ship;
    if (ship) {
      ship.hit();
    }
    return true;
  };

  const placeShip = (
    ship: ShipInterface,
    coordinates: { x: number; y: number },
    orientation: "horizontal" | "vertical"
  ) => {
    const locations = canPlace(coordinates, ship.getLength(), orientation);
    if (!locations) {
      return false;
    }
    for (const { x, y } of locations) {
      board[x][y].ship = ship;
    }
    ships.push(ship);
    return locations;
  };

  const gameOver = () => ships.every((ship) => ship.isSunk());
  const resetBoard = () => {
    board = generateBoard();
    ships = [];
  };

  return {
    receiveAttack,
    getBoard: () => board,
    placeShip,
    gameOver,
    resetBoard,
  };
}

export interface BoardInterface {
  receiveAttack: (x: number, y: number) => boolean;
  getBoard: () => { hit: boolean; ship: undefined | ShipInterface }[][];
  placeShip: (
    ship: ShipInterface,
    coordinates: { x: number; y: number },
    orientation: "horizontal" | "vertical"
  ) => boolean | { x: number; y: number }[];
  gameOver: () => boolean;
  resetBoard: () => void;
}
