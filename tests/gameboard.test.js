import { expect, test } from "@jest/globals";
import ship from "../src/factories/ship";
import board from "../src/factories/board";

// recieve attack on given coordinates
test("revieve an attack at (0,0)", () => {
  const testBoard = board();
  testBoard.receiveAttack(0, 0);
  expect(testBoard.getBoard()[0][0].hit).toBe(true);
});

test("revieve an attack at (9,9)", () => {
  const testBoard = board();
  testBoard.receiveAttack(9, 9);
  expect(testBoard.getBoard()[9][9].hit).toBe(true);
});

test("revieve an attack at (9,9)", () => {
  const testBoard = board();
  testBoard.receiveAttack(9, 9);
  expect(testBoard.getBoard()[9][9].hit).toBe(true);
});

//place ship on gameboard
test("place carriership horizontally at (0,0)", () => {
  const testBoard = board();
  const testShip = ship("carrier");
  testBoard.placeShip(testShip, { x: 0, y: 0 }, "horizontal");
  expect(testBoard.getBoard()[0][1].ship).toBe(testShip);
});

test("place carriership vertically at (0,0)", () => {
  const testBoard = board();
  const testShip = ship("carrier");
  testBoard.placeShip(testShip, { x: 0, y: 0 }, "vertical");
  expect(testBoard.getBoard()[0][1].ship).toBe(testShip);
});

test("check carrier occupies proper coordinates horizontally", () => {
  const testBoard = board();
  const testShip = ship("carrier");
  testBoard.placeShip(testShip, { x: 5, y: 5 }, "horizontal");
  const occupied = [
    testBoard.getBoard()[5][5].ship,
    testBoard.getBoard()[9][5].ship,
  ];
  expect(occupied).toEqual([testShip, testShip]);
});
test("check submarine occupies proper coordinates vertically", () => {
  const testBoard = board();
  const testShip = ship("carrier");
  testBoard.placeShip(testShip, { x: 5, y: 5 });
  const occupied = [
    testBoard.getBoard()[5][5].ship,
    testBoard.getBoard()[5][4].ship,
  ];
  expect(occupied).toEqual([testShip, testShip]);
});

// place a ship on occupied coordinates
test("place submarine is coordinates occupied by another ship", () => {
  const testBoard = board();
  const testCarrier = ship("carrier");
  const testSubmarine = ship("submarine");
  testBoard.placeShip(testCarrier, { x: 0, y: 0 }, "horizontal");

  expect(testBoard.placeShip(testSubmarine, { x: 0, y: 0 }, "horizontal")).toBe(
    false
  );
});

// place ship in out of bounds cordinates
test("place submarine in out of bounds coordinates horizontally", () => {
  const testBoard = board();
  const testSubmarine = ship("submarine");

  expect(testBoard.placeShip(testSubmarine, { x: 9, y: 9 }, "horizontal")).toBe(
    false
  );
});

test("place submarine in out of bounds coordinates vertically", () => {
  const testBoard = board();
  const testSubmarine = ship("submarine");

  expect(testBoard.placeShip(testSubmarine, { x: 9, y: 9 }, "vertical")).toBe(
    false
  );
});

//check if game over
test("check if the same is over is the submarine is sunk but there carrier only has a single hit", () => {
  const testBoard = board();
  const testCarrier = ship("carrier");
  const testSubmarine = ship("submarine");
  testBoard.placeShip(testCarrier, { x: 0, y: 0 }, "horizontal");
  testCarrier.hit();
  testBoard.placeShip(testSubmarine, { x: 0, y: 9 }, "vertically");
  for (let i = 0; i < testSubmarine.getLength(); i++) {
    testCarrier.hit();
  }

  expect(testBoard.gameOver()).toBe(false);
});

test("check if the game  is over if all ships are sunk", () => {
  const testBoard = board();
  const testCarrier = ship("carrier");
  const testSubmarine = ship("submarine");
  testBoard.placeShip(testCarrier, { x: 0, y: 0 }, "horizontal");
  for (let i = 0; i < testCarrier.getLength(); i++) {
    testCarrier.hit();
  }
  testBoard.placeShip(testSubmarine, { x: 0, y: 9 }, "vertically");
  for (let i = 0; i < testSubmarine.getLength(); i++) {
    testCarrier.hit();
  }

  expect(testBoard.gameOver()).toBe(true);
});

//reset board
test("revieve an attack at (0,0)", () => {
  const testBoard = board();
  testBoard.receiveAttack(0, 0);
  testBoard.resetBoard();
  expect(testBoard.getBoard()[0][0].hit).toBe(false);
});
