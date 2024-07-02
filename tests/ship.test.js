import { expect, test } from "@jest/globals";
import ship from "../src/factories/ship";

// test carrier
test("check if a carrier ship with a single hit is sunk", () => {
  const testShip = ship("carrier");
  testShip.hit();
  expect(testShip.isSunk()).toBe(false);
});

test("check if a carrier ship with a five hits is sunk", () => {
  const testShip = ship("carrier");
  for (let i = 0; i < 5; i++) {
    testShip.hit();
  }
  expect(testShip.isSunk()).toBe(true);
});
//test battleship
test("check if a battleship with  3 hits is sunk", () => {
  const testShip = ship("battleship");
  for (let i = 0; i < 3; i++) {
    testShip.hit();
  }
  expect(testShip.isSunk()).toBe(false);
});
test("check if a battleship with  4 hits is sunk", () => {
  const testShip = ship("battleship");
  for (let i = 0; i < 4; i++) {
    testShip.hit();
  }
  expect(testShip.isSunk()).toBe(true);
});

//test cruiser
test("check if a cruiser with  2 hits is sunk", () => {
  const testShip = ship("cruiser");
  for (let i = 0; i < 2; i++) {
    testShip.hit();
  }
  expect(testShip.isSunk()).toBe(false);
});
test("check if a cruiser with  3 hits is sunk", () => {
  const testShip = ship("cruiser");
  for (let i = 0; i < 3; i++) {
    testShip.hit();
  }
  expect(testShip.isSunk()).toBe(true);
});

//test submarine
test("check if a submarine with  2 hits is sunk", () => {
  const testShip = ship("submarine");
  for (let i = 0; i < 2; i++) {
    testShip.hit();
  }
  expect(testShip.isSunk()).toBe(false);
});
test("check if a submarine with  hits equal to its length is sunk", () => {
  const testShip = ship("submarine");
  for (let i = 0; i < testShip.getLength(); i++) {
    testShip.hit();
  }
  expect(testShip.isSunk()).toBe(true);
});

//test destroyer
test("check if a destroyer with  1 hits is sunk", () => {
  const testShip = ship("destroyer");
  testShip.hit();
  expect(testShip.isSunk()).toBe(false);
});
test("check if a destroyer with  hits equal to its length  is sunk", () => {
  const testShip = ship("destroyer");
  for (let i = 0; i < testShip.getLength(); i++) {
    testShip.hit();
  }
  expect(testShip.isSunk()).toBe(true);
});
