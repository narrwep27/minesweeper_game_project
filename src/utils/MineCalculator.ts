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

    for (let i = 1; i < topRow.length - 1; i++) {
        let mineCount = 0;
        if (topRow[i - 1].mine) mineCount++;
        if (topRow[i + 1].mine) mineCount++;
        if (nextRow[i - 1].mine) mineCount++;
        if (nextRow[i].mine) mineCount++;
        if (nextRow[i + 1].mine) mineCount++;
        allMineCounts.push(mineCount);
    };

    return allMineCounts;
};

const countMidEdges = (cellsByRow: Cell[][]): number[][] => {
    let allEdgeCounts: number[][] = [];

    for (let i = 1; i < cellsByRow.length - 1; i++) {
        const [currentRow, aboveRow, nextRow] = [cellsByRow[i], cellsByRow[i - 1], cellsByRow[i + 1]];
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

    for (let i = 1; i < cellsByRow.length - 1; i++) {
        const [currentRow, aboveRow, nextRow] = [cellsByRow[i], cellsByRow[i - 1], cellsByRow[i + 1]];
        let rowCounts: number[] = [];

        for (let j = 1; currentRow.length - 1; j++) {
            let mineCount = 0;
            if (aboveRow[j - 1].mine) mineCount++;
            if (aboveRow[j].mine) mineCount++;
            if (aboveRow[j + 1].mine) mineCount++;
            if (currentRow[j - 1].mine) mineCount++;
            if (currentRow[j + 1].mine) mineCount++;
            if (nextRow[j - 1].mine) mineCount++;
            if (nextRow[j].mine) mineCount++;
            if (nextRow[j + 1].mine) mineCount++;
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

    for (let i = 1; i < botRow.length - 1; i++) {
        let mineCount = 0;
        if (aboveRow[i - 1].mine) mineCount++;
        if (aboveRow[i].mine) mineCount++;
        if (aboveRow[i + 1].mine) mineCount++;
        if (botRow[i - 1].mine) mineCount++;
        if (botRow[i + 1].mine) mineCount++;
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
    for (let i = 0; i < midEdgeCounts.length; i++) {
        let rowCounts = [midEdgeCounts[i][0], ...midCenterCounts[i], midEdgeCounts[i][1]];
        allMidRowCounts.push(rowCounts);
    };
    let botRowCounts = [botCornerCounts[0], ...botCenterCounts, botCornerCounts[1]];

    return [topRowCounts, ...allMidRowCounts, botRowCounts];
};

export default getAllMineCounts;
