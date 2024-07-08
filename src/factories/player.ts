import { ShipInterface } from "./ship";

export function player(name: string): PlayerInterface {
  let wins = 0;
  const incrementWins = () => {
    wins += 1;
  };
  const getWins = () => wins;
  return { incrementWins, getWins };
}
export function computerPlayer(name: string): ComputerInterface {
  let previousHit;

  const getRandomMove = (
    board: { hit: boolean; ship: undefined | ShipInterface }[][]
  ) => {
    let randomMove;
    while (randomMove !== undefined) {
      const randomX = Math.floor(Math.random() * 10);
      const randomY = Math.floor(Math.random() * 10);
      if (board[randomX][randomY].hit === false) {
        randomMove = { x: randomX, y: randomY };
      }
    }
    return randomMove;
  };
  const makeMove = (
    board: { hit: boolean; ship: undefined | ShipInterface }[][]
  ) => {
    return true;
  };
  return { getRandomMove, ...player(name) };
}

export interface PlayerInterface {
  incrementWins: () => void;
  getWins: () => number;
}

export interface ComputerInterface extends PlayerInterface {
  getRandomMove: (
    board: { hit: boolean; ship: undefined | ShipInterface }[][]
  ) => {
    x: number;
    y: number;
  };
}
