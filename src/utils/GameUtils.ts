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

export const getRandIntMaxExclusive = (min: number, max: number): number => {
    return Math.floor(Math.random() * (max - min) + min);
}

export const initializeMines = (startInd: number, gameBoard: Cell[]): Cell[] => {
    let mineCount = 0;
    if (gameBoard.length === 81) mineCount = 10;
    if (gameBoard.length === 256) mineCount = 40;
    if (gameBoard.length === 480) mineCount = 99;

    let rng = getRandIntMaxExclusive(0, gameBoard.length);

    for (let i = 0; i < mineCount; i++) {
        while (rng === startInd || gameBoard[rng].mine) {
            rng = getRandIntMaxExclusive(0, gameBoard.length);
        };
        gameBoard[rng].mine = true;
    };

    return gameBoard;
};
