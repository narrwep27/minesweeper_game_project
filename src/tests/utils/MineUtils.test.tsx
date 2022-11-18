import Cell from "../../models/Cell";
import Mode from "../../models/Mode";
import { createGameBoard, orderCellsByRow } from "../../utils/GameBoardUtils";
import {
    setMines,
    getRandIndForMode,
    initializeMineCounts
} from "../../utils/MineUtils";

describe('MineUtils', () => {
    test('setMines returns proper number of mines with different modes', () => {
        let mineCount: number;

        const begBoard = createGameBoard(Mode.Beginner);
        setMines(0, begBoard);
        mineCount = countMines(begBoard);
        expect(mineCount).toBe(10);

        const intBoard = createGameBoard(Mode.Intermediate);
        setMines(0, intBoard);
        mineCount = countMines(intBoard);
        expect(mineCount).toBe(40);

        const expBoard = createGameBoard(Mode.Expert);
        setMines(0, expBoard);
        mineCount = countMines(expBoard);
        expect(mineCount).toBe(99);
    });

    test('setMines never sets mine at starting index', () => {
        let startInd = getRandIndForMode(Mode.Beginner);
        const begBoard = createGameBoard(Mode.Beginner);
        setMines(startInd, begBoard);
        expect(begBoard[startInd].mine).not.toBe(true);

        startInd = getRandIndForMode(Mode.Intermediate);
        const intBoard = createGameBoard(Mode.Intermediate);
        setMines(startInd, intBoard);
        expect(intBoard[startInd].mine).not.toBe(true);

        startInd = getRandIndForMode(Mode.Expert);
        const expBoard = createGameBoard(Mode.Expert);
        setMines(startInd, expBoard);
        expect(expBoard[startInd].mine).not.toBe(true);
    });

    test('initializeMineCounts causes adjacent squares to detect mines', () => {
        const begBoard: Cell[] = createGameBoard(Mode.Beginner);
        setMines(0, begBoard);
        const begBoardByRow: Cell[][] = orderCellsByRow(begBoard)
        initializeMineCounts(begBoardByRow);
        testDetectMines(begBoardByRow);

        const intBoard = createGameBoard(Mode.Intermediate);
        setMines(0, intBoard);
        const intBoardByRow = orderCellsByRow(intBoard);
        initializeMineCounts(intBoardByRow);
        testDetectMines(intBoardByRow);

        const expBoard = createGameBoard(Mode.Expert);
        setMines(0, expBoard);
        const expBoardByRow = orderCellsByRow(expBoard);
        initializeMineCounts(expBoardByRow);
        testDetectMines(expBoardByRow);
    });
});

const countMines = (gameBoard: Cell[]): number => {
    let mineCount = 0;
    for (let i = 0; i < gameBoard.length; i++) {
        if (gameBoard[i].mine) mineCount++;
    };
    return mineCount;
};

const testDetectMines = (boardByRow: Cell[][]): void => {
    for (let row = 0; row < boardByRow.length; row++) {
        const lastRow = boardByRow.length - 1;
        for (let col = 0; col < boardByRow[row].length; col++) {
            const lastCol = boardByRow[row].length - 1;
            if (!boardByRow[row][col].mine) continue;

            if (row === 0) {
                if (col === 0) {
                    expect(boardByRow[0][1].value).toBeGreaterThan(0);
                    expect(boardByRow[1][0].value).toBeGreaterThan(0);
                    expect(boardByRow[1][1].value).toBeGreaterThan(0);
                }
                else if (col === lastCol) {
                    expect(boardByRow[0][lastCol - 1].value).toBeGreaterThan(0);
                    expect(boardByRow[1][lastCol - 1].value).toBeGreaterThan(0);
                    expect(boardByRow[1][lastCol].value).toBeGreaterThan(0);
                }
                else {
                    expect(boardByRow[0][col - 1].value).toBeGreaterThan(0);
                    expect(boardByRow[0][col + 1].value).toBeGreaterThan(0);
                    expect(boardByRow[1][col - 1].value).toBeGreaterThan(0);
                    expect(boardByRow[1][col].value).toBeGreaterThan(0);
                    expect(boardByRow[1][col + 1].value).toBeGreaterThan(0);
                };
            }
            else if (row === lastRow) {
                if (col === 0) {
                    expect(boardByRow[lastRow - 1][0].value).toBeGreaterThan(0);
                    expect(boardByRow[lastRow - 1][1].value).toBeGreaterThan(0);
                    expect(boardByRow[lastRow][1].value).toBeGreaterThan(0);
                }
                else if (col === lastCol) {
                    expect(boardByRow[lastRow - 1][lastCol - 1].value).toBeGreaterThan(0);
                    expect(boardByRow[lastRow - 1][lastCol].value).toBeGreaterThan(0);
                    expect(boardByRow[lastRow][lastCol - 1].value).toBeGreaterThan(0);
                }
                else {
                    expect(boardByRow[lastRow - 1][col - 1].value).toBeGreaterThan(0);
                    expect(boardByRow[lastRow - 1][col].value).toBeGreaterThan(0);
                    expect(boardByRow[lastRow - 1][col + 1].value).toBeGreaterThan(0);
                    expect(boardByRow[lastRow][col - 1].value).toBeGreaterThan(0);
                    expect(boardByRow[lastRow][col + 1].value).toBeGreaterThan(0);
                };
            }
            else {
                if (col === 0) {
                    expect(boardByRow[row - 1][0].value).toBeGreaterThan(0);
                    expect(boardByRow[row - 1][1].value).toBeGreaterThan(0);
                    expect(boardByRow[row][1].value).toBeGreaterThan(0);
                    expect(boardByRow[row + 1][0].value).toBeGreaterThan(0);
                    expect(boardByRow[row + 1][1].value).toBeGreaterThan(0);
                }
                else if (col === lastCol) {
                    expect(boardByRow[row - 1][lastCol - 1].value).toBeGreaterThan(0);
                    expect(boardByRow[row - 1][lastCol].value).toBeGreaterThan(0);
                    expect(boardByRow[row][lastCol - 1].value).toBeGreaterThan(0);
                    expect(boardByRow[row + 1][lastCol - 1].value).toBeGreaterThan(0);
                    expect(boardByRow[row + 1][lastCol].value).toBeGreaterThan(0);
                }
                else {
                    expect(boardByRow[row - 1][col - 1].value).toBeGreaterThan(0);
                    expect(boardByRow[row - 1][col].value).toBeGreaterThan(0);
                    expect(boardByRow[row - 1][col + 1].value).toBeGreaterThan(0);
                    expect(boardByRow[row][col - 1].value).toBeGreaterThan(0);
                    expect(boardByRow[row][col + 1].value).toBeGreaterThan(0);
                    expect(boardByRow[row + 1][col - 1].value).toBeGreaterThan(0);
                    expect(boardByRow[row + 1][col].value).toBeGreaterThan(0);
                    expect(boardByRow[row + 1][col + 1].value).toBeGreaterThan(0);
                };
            };
        };
    };
};
