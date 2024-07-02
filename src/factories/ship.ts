export default function ship(
  type: "carrier" | "battleship" | "cruiser" | "submarine" | "destroyer"
): Ship {
  const shipLength = {
    carrier: 5,
    battleship: 4,
    cruiser: 3,
    submarine: 3,
    destroyer: 2,
  };
  let hits = 0;

  const hit = () => {
    hits += 1;
  };

  const isSunk = () => hits >= shipLength[type];

  return { hit, isSunk, getLength: () => shipLength[type] };
}

export interface Ship {
  hit: () => void;
  isSunk: () => boolean;
  getLength: () => number;
}
