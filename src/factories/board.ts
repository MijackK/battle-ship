import { Ship } from "./ship";
export default function board(): Board {
  const generateBoard = () =>
    Array.from(Array(10), () =>
      Array(10).fill({ hit: false, ship: undefined })
    );
  let board: { hit: boolean; ship: undefined | Ship }[][] = generateBoard();

  let ships: Ship[] = [];

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
      const empty = !board[coordinates.x][coordinates.y].ship;
      if (empty && inbound) {
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
    const ship: Ship = location.ship;
    if (ship) {
      ship.hit();
    }
    return true;
  };

  const placeShip = (
    ship: Ship,
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
    return true;
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

export interface Board {
  receiveAttack: (x: number, y: number) => boolean;
  getBoard: () => { hit: boolean; ship: undefined | Ship }[][];
  placeShip: (
    ship: Ship,
    coordinates: { x: number; y: number },
    orientation: "horizontal" | "vertical"
  ) => boolean;
  gameOver: () => boolean;
  resetBoard: () => void;
}
