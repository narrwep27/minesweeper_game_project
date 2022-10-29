import Mode from "../models/Mode";
import Cell from "../models/Cell";

export const createGameBoard = (mode: Mode): Cell[] => {
    let rowCount: number = 0;
    let colCount: number = 0;
    if (mode === Mode.Beginner) [rowCount, colCount] = [9, 9];
    if (mode === Mode.Intermediate) [rowCount, colCount] = [16, 16];
    if (mode === Mode.Expert) [rowCount, colCount] = [16, 30];

    const gameBoard: Cell[] = [];
    for (let row = 1; row <= rowCount; row++) {
        for (let col = 1; col <= colCount; col++) {
            gameBoard.push({
                value: 0,
                revealed: false,
                flagged: false,
                row: row,
                col: col
            })
        }
    }

    return gameBoard;
};

export const initializeMines = () => {};
