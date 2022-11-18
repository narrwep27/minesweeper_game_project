import Cell from "../models/Cell";
import Mode from "../models/Mode";
import getAllMineCounts from "./MineCalculator";

export const getRandIndForMode = (mode: Mode | number): number => {
    if (mode === Mode.Beginner || mode === 81) return Math.floor(Math.random() * 81);
    if (mode === Mode.Intermediate || mode === 256) return Math.floor(Math.random() * 256);
    if (mode === Mode.Expert || mode === 480) return Math.floor(Math.random() * 480);

    throw new Error('Mode needs to be provided in getRandIndForMode function.');
}

export const setMines = (startInd: number, gameBoard: Cell[]): void => {
    let mineCount = 0;
    if (gameBoard.length === 81) mineCount = 10;
    else if (gameBoard.length === 256) mineCount = 40;
    else mineCount = 99;

    let rng = getRandIndForMode(gameBoard.length);

    for (let i = 0; i < mineCount; i++) {
        while (rng === startInd || gameBoard[rng].mine) {
            rng = getRandIndForMode(gameBoard.length);
        };
        gameBoard[rng].mine = true;
    };
};

export const initializeMineCounts = (cellsByRow: Cell[][]): void => {
    const allCountsByRow = getAllMineCounts(cellsByRow);

    for (let row = 0; row < cellsByRow.length; row++) {
        for (let col = 0; col < cellsByRow[row].length; col++) {
            cellsByRow[row][col].value = allCountsByRow[row][col];
        };
    };
};
