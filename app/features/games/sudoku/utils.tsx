import { SudokuTile } from "./SudokuTile";

export const generateEmptyBoard = (): SudokuTile[][] => {
  const board: SudokuTile[][] = [];

  for (let row = 0; row < 9; row++) {
    const rowTiles: SudokuTile[] = [];
    for (let col = 0; col < 9; col++) {
      rowTiles.push(new SudokuTile(0, { row, col }));
    }
    board.push(rowTiles);
  }

  return board;
};

export function isValidMove(
  board: number[][],
  row: number,
  col: number,
  num: number
): boolean {
  return (
    checkRow(board, row, num) &&
    checkColumn(board, col, num) &&
    checkSubGrid(board, row, col, num)
  );
}

function checkRow(board: number[][], row: number, num: number): boolean {
  return !board[row].includes(num);
}

function checkColumn(board: number[][], col: number, num: number): boolean {
  for (let row = 0; row < 9; row++) {
    if (board[row][col] === num) return false;
  }
  return true;
}

function checkSubGrid(
  board: number[][],
  row: number,
  col: number,
  num: number
): boolean {
  const startRow = Math.floor(row / 3) * 3;
  const startCol = Math.floor(col / 3) * 3;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[startRow + i][startCol + j] === num) return false;
    }
  }
  return true;
}
