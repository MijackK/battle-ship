import { Ship } from "./ship";

export function player(name: string) {
  let wins = 0;
  const incrementWins = () => {
    wins += 1;
  };
  const getWins = () => wins;
  return { incrementWins, getWins };
}
export function computerPlayer(name: string): ComputerPlayer {
  let previousHit;

  const getRandomMove = (
    board: { hit: boolean; ship: undefined | Ship }[][]
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
  const makeMove = (board: { hit: boolean; ship: undefined | Ship }[][]) => {
    return true;
  };
  return { getRandomMove, ...player(name) };
}

export interface Player {
  incrementWins: () => void;
  getWins: () => number;
}

export interface ComputerPlayer extends Player {
  getRandomMove: (board: { hit: boolean; ship: undefined | Ship }[][]) => {
    x: number;
    y: number;
  };
}
