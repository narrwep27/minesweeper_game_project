import Mode from "../models/Mode";
import Cell from "../models/Cell";

export const createGameBoard = (mode: Mode): Cell[] => {
    let rowCount: number = 0;
    let colCount: number = 0;
    if (mode === Mode.Beginner) [rowCount, colCount] = [9, 9];
    else if (mode === Mode.Intermediate) [rowCount, colCount] = [16, 16];
    else [rowCount, colCount] = [16, 30];

    const gameBoard: Cell[] = [];
    for (let row = 1; row <= rowCount; row++) {
        for (let col = 1; col <= colCount; col++) {
            gameBoard.push({
                value: 0,
                mine: false,
                revealed: false,
                flagged: false,
                row: row,
                col: col
            })
        }
    }

    return gameBoard;
};

export const orderCellsByRow = (gameBoard: Cell[]): Cell[][] => {
    let cellsByRow: Cell[][] = [];
    let rowCount: number = 0;
    let colCount: number = 0;
    if (gameBoard.length === 81) [rowCount, colCount] = [9, 9];
    else if (gameBoard.length === 256) [rowCount, colCount] = [16, 16];
    else [rowCount, colCount] = [16, 30];

    for (let i = 0; i < rowCount; i++) {
        cellsByRow.push(gameBoard.splice(0, colCount));
    };

    return cellsByRow;
};

export const toggleFlag = (cell: Cell): void => {
    cell.flagged = cell.flagged ? false : true;
};

export const revealCellAndAdj = (row: number, col: number, boardByRow: Cell[][]): void => {};
