import Cell from "../models/Cell";
import getAllMineCounts from "./MineCalculator";

export const getRandIntMaxExclusive = (min: number, max: number): number => {
    return Math.floor(Math.random() * (max - min) + min);
}

export const setMines = (startInd: number, gameBoard: Cell[]): void => {
    let mineCount = 0;
    if (gameBoard.length === 81) mineCount = 10;
    else if (gameBoard.length === 256) mineCount = 40;
    else mineCount = 99;

    let rng = getRandIntMaxExclusive(0, gameBoard.length);

    for (let i = 0; i < mineCount; i++) {
        while (rng === startInd || gameBoard[rng].mine) {
            rng = getRandIntMaxExclusive(0, gameBoard.length);
        };
        gameBoard[rng].mine = true;
    };
};

export const initializeMineCounts = (cellsByRow: Cell[][]): void => {
    const allCountsByRow = getAllMineCounts(cellsByRow);

    for (let row = 0; row < cellsByRow.length; row++) {
        for (let col = 0; col < cellsByRow[row].length; col++) {
            cellsByRow[row][col].value = allCountsByRow[row][col];
        }
    }
};
