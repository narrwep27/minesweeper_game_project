import Cell from "../models/Cell";

export const getRandIntMaxExclusive = (min: number, max: number): number => {
    return Math.floor(Math.random() * (max - min) + min);
}

export const setMines = (startInd: number, gameBoard: Cell[]): Cell[] => {
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

    return gameBoard;
};

export const initializeMineCounts = (cellsByRow: Cell[][]): Cell[][] => {};

const countTopCorners = (cellsByRow: Cell[][]): number[] => {
    const [topRow, nextRow] = [cellsByRow[0], cellsByRow[1]];
    let [leftCount, rightCount, last] = [0, 0, topRow.length - 1];

    if (!topRow[0].mine) {
        if (topRow[1].mine) leftCount++;
        if (nextRow[0].mine) leftCount++;
        if (nextRow[1].mine) leftCount++;
    };

    if (!topRow[last].mine) {
        if (topRow[last - 1].mine) rightCount++;
        if (nextRow[last].mine) rightCount++;
        if (nextRow[last - 1].mine) rightCount++;
    };

    return [leftCount, rightCount];
};

const countTopCenter = (cellsByRow: Cell[][]): number[] => {
    const [topRow, nextRow] = [cellsByRow[0], cellsByRow[1]];
    let allMineCounts: number[] = [];

    for (let i = 1; i < topRow.length - 1; i++) {
        let mineCount = 0;
        if (!topRow[i].mine) {
            if (topRow[i - 1].mine) mineCount++;
            if (topRow[i + 1].mine) mineCount++;
            if (nextRow[i - 1].mine) mineCount++;
            if (nextRow[i].mine) mineCount++;
            if (nextRow[i + 1].mine) mineCount++;
        };
        allMineCounts.push(mineCount);
    };

    return allMineCounts;
};

const countMidEdges = (cellsByRow: Cell[][]): number[][] => {
    let allEdgeCounts: number[][] = [];

    for (let i = 1; i < cellsByRow.length - 1; i++) {
        const [currentRow, aboveRow, nextRow] = [cellsByRow[i], cellsByRow[i - 1], cellsByRow[i + 1]];
        let [leftCount, rightCount, last] = [0, 0, currentRow.length - 1];

        if (!currentRow[0].mine) {
            if (aboveRow[0].mine) leftCount++;
            if (aboveRow[1].mine) leftCount++;
            if (currentRow[1].mine) leftCount++;
            if (nextRow[0].mine) leftCount++;
            if (nextRow[1].mine) leftCount++;
        };

        if (!currentRow[last].mine) {
            if (aboveRow[last - 1].mine) rightCount++;
            if (aboveRow[last].mine) rightCount++;
            if (currentRow[last - 1].mine) rightCount++;
            if (nextRow[last - 1].mine) rightCount++;
            if (nextRow[last].mine) rightCount++;
        };

        allEdgeCounts.push([leftCount, rightCount]);
    };

    return allEdgeCounts;
};

const countMidCenter = (cellsByRow: Cell[][]): number[][] => {};

const countBotCorners = (cellsByRow: Cell[][]): number[] => {
    const [botRow, aboveRow] = [cellsByRow[cellsByRow.length - 1], cellsByRow[cellsByRow.length - 2]];
    let [leftCount, rightCount, last] = [0, 0, botRow.length - 1];

    if (!botRow[0].mine) {
        if (aboveRow[0].mine) leftCount++;
        if (aboveRow[1].mine) leftCount++;
        if (botRow[1].mine) leftCount++;
    };

    if (!botRow[last].mine) {
        if (aboveRow[last - 1].mine) rightCount++;
        if (aboveRow[last].mine) rightCount++;
        if (botRow[last - 1].mine) rightCount++;
    };

    return [leftCount, rightCount];
};

const countBotCenter = (cellsByRow: Cell[][]): number[] => {
    const [botRow, aboveRow] = [cellsByRow[cellsByRow.length - 1], cellsByRow[cellsByRow.length - 2]];
    let allMineCounts: number[] = [];

    for (let i = 1; i < botRow.length - 1; i++) {
        let mineCount = 0;
        if (!botRow[i].mine) {
            if (aboveRow[i - 1].mine) mineCount++;
            if (aboveRow[i].mine) mineCount++;
            if (aboveRow[i + 1].mine) mineCount++;
            if (botRow[i - 1].mine) mineCount++;
            if (botRow[i + 1].mine) mineCount++;
        };
        allMineCounts.push(mineCount);
    };

    return allMineCounts;
};