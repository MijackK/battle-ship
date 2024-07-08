export function generateCell(x: number, y: number, boardID: string) {
  const cell = document.createElement("div");
  cell.style.border = "1px solid black";
  cell.id = `${boardID}${x}${y}`;
  cell.textContent = `${x},${y}`;
  return cell;
}

export function addRowToboard(cells: HTMLDivElement[], boardID: string) {
  const board = document.querySelector(`#${boardID}`);
  board.prepend(...cells);
}
export function resetBoard(boardID: string) {}

export function displayShip(
  boardID: string,
  locations: { x: number; y: number }[]
) {
  locations.forEach(({ x, y }) => {
    const cell: HTMLElement = document.querySelector(`#${boardID}${x}${y}`);
    cell.style.backgroundColor = "palegreen";
  });
}

export function displayHit(cell: HTMLDivElement) {
  cell.style.backgroundColor = "tomato";
}
