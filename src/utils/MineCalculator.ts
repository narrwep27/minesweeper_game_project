import Cell from "../models/Cell";

const countTopCorners = (cellsByRow: Cell[][]): number[] => {
    const [topRow, nextRow] = [cellsByRow[0], cellsByRow[1]];
    let [leftCount, rightCount, last] = [0, 0, topRow.length - 1];

    if (topRow[1].mine) leftCount++;
    if (nextRow[0].mine) leftCount++;
    if (nextRow[1].mine) leftCount++;
    if (topRow[last - 1].mine) rightCount++;
    if (nextRow[last].mine) rightCount++;
    if (nextRow[last - 1].mine) rightCount++;

    return [leftCount, rightCount];
};

const countTopCenter = (cellsByRow: Cell[][]): number[] => {
    const [topRow, nextRow] = [cellsByRow[0], cellsByRow[1]];
    let allMineCounts: number[] = [];

    for (let row = 1; row < topRow.length - 1; row++) {
        let mineCount = 0;
        
        if (topRow[row - 1].mine) mineCount++;
        if (topRow[row + 1].mine) mineCount++;
        if (nextRow[row - 1].mine) mineCount++;
        if (nextRow[row].mine) mineCount++;
        if (nextRow[row + 1].mine) mineCount++;

        allMineCounts.push(mineCount);
    };

    return allMineCounts;
};

const countMidEdges = (cellsByRow: Cell[][]): number[][] => {
    let allEdgeCounts: number[][] = [];

    for (let row = 1; row < cellsByRow.length - 1; row++) {
        const [currentRow, aboveRow, nextRow] = [cellsByRow[row], cellsByRow[row - 1], cellsByRow[row + 1]];
        let [leftCount, rightCount, last] = [0, 0, currentRow.length - 1];

        if (aboveRow[0].mine) leftCount++;
        if (aboveRow[1].mine) leftCount++;
        if (currentRow[1].mine) leftCount++;
        if (nextRow[0].mine) leftCount++;
        if (nextRow[1].mine) leftCount++;
        if (aboveRow[last - 1].mine) rightCount++;
        if (aboveRow[last].mine) rightCount++;
        if (currentRow[last - 1].mine) rightCount++;
        if (nextRow[last - 1].mine) rightCount++;
        if (nextRow[last].mine) rightCount++;

        allEdgeCounts.push([leftCount, rightCount]);
    };

    return allEdgeCounts;
};

const countMidCenter = (cellsByRow: Cell[][]): number[][] => {
    let allMidCounts: number[][] = [];

    for (let row = 1; row < cellsByRow.length - 1; row++) {
        const [currentRow, aboveRow, nextRow] = [cellsByRow[row], cellsByRow[row - 1], cellsByRow[row + 1]];
        let rowCounts: number[] = [];

        for (let col = 1; col < currentRow.length - 1; col++) {
            let mineCount = 0;

            if (aboveRow[col - 1].mine) mineCount++;
            if (aboveRow[col].mine) mineCount++;
            if (aboveRow[col + 1].mine) mineCount++;
            if (currentRow[col - 1].mine) mineCount++;
            if (currentRow[col + 1].mine) mineCount++;
            if (nextRow[col - 1].mine) mineCount++;
            if (nextRow[col].mine) mineCount++;
            if (nextRow[col + 1].mine) mineCount++;

            rowCounts.push(mineCount);
        };

        allMidCounts.push(rowCounts);
    };

    return allMidCounts;
};

const countBotCorners = (cellsByRow: Cell[][]): number[] => {
    const [botRow, aboveRow] = [cellsByRow[cellsByRow.length - 1], cellsByRow[cellsByRow.length - 2]];
    let [leftCount, rightCount, last] = [0, 0, botRow.length - 1];

    if (aboveRow[0].mine) leftCount++;
    if (aboveRow[1].mine) leftCount++;
    if (botRow[1].mine) leftCount++;
    if (aboveRow[last - 1].mine) rightCount++;
    if (aboveRow[last].mine) rightCount++;
    if (botRow[last - 1].mine) rightCount++;

    return [leftCount, rightCount];
};

const countBotCenter = (cellsByRow: Cell[][]): number[] => {
    const [botRow, aboveRow] = [cellsByRow[cellsByRow.length - 1], cellsByRow[cellsByRow.length - 2]];
    let allMineCounts: number[] = [];

    for (let row = 1; row < botRow.length - 1; row++) {
        let mineCount = 0;

        if (aboveRow[row - 1].mine) mineCount++;
        if (aboveRow[row].mine) mineCount++;
        if (aboveRow[row + 1].mine) mineCount++;
        if (botRow[row - 1].mine) mineCount++;
        if (botRow[row + 1].mine) mineCount++;

        allMineCounts.push(mineCount);
    };

    return allMineCounts;
};

const getAllMineCounts = (cellsByRow: Cell[][]): number[][]=> {
    const topCornerCounts = countTopCorners(cellsByRow);
    const topCenterCounts = countTopCenter(cellsByRow);
    const midEdgeCounts = countMidEdges(cellsByRow);
    const midCenterCounts = countMidCenter(cellsByRow);
    const botCornerCounts = countBotCorners(cellsByRow);
    const botCenterCounts = countBotCenter(cellsByRow);

    let topRowCounts = [topCornerCounts[0], ...topCenterCounts, topCornerCounts[1]];
    let allMidRowCounts: number[][] = [];
    for (let row = 0; row < midEdgeCounts.length; row++) {
        let rowCounts = [midEdgeCounts[row][0], ...midCenterCounts[row], midEdgeCounts[row][1]];
        allMidRowCounts.push(rowCounts);
    };
    let botRowCounts = [botCornerCounts[0], ...botCenterCounts, botCornerCounts[1]];

    return [topRowCounts, ...allMidRowCounts, botRowCounts];
};

export default getAllMineCounts;
