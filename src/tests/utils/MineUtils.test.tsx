import Cell from "../../models/Cell";
import Mode from "../../models/Mode";
import { createGameBoard, orderCellsByRow } from "../../utils/GameBoardUtils";
import {
    setMines,
    getRandIntMaxExclusive,
    initializeMineCounts
} from "../../utils/MineUtils";

const countMines = (gameBoard: Cell[]): number => {
    let mineCount = 0;
    for (let i = 0; i < gameBoard.length; i++) {
        if (gameBoard[i].mine) mineCount++;
    };
    return mineCount;
};

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
        let startInd = getRandIntMaxExclusive(0, 81);
        const begBoard = createGameBoard(Mode.Beginner);
        setMines(startInd, begBoard);
        expect(begBoard[startInd].mine).not.toBe(true);

        startInd = getRandIntMaxExclusive(0, 256);
        const intBoard = createGameBoard(Mode.Intermediate);
        setMines(startInd, intBoard);
        expect(intBoard[startInd].mine).not.toBe(true);

        startInd = getRandIntMaxExclusive(0, 480);
        const expBoard = createGameBoard(Mode.Expert);
        setMines(startInd, expBoard);
        expect(expBoard[startInd].mine).not.toBe(true);
    });

    test('initializeMineCounts causes adjacent squares to detect mines', () => {
        const begBoard = createGameBoard(Mode.Beginner);
        setMines(0, begBoard);
        const begBoardByRow = orderCellsByRow(begBoard)
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

const testDetectMines = (boardByRow: Cell[][]): void => {
    const cellExists = (row: number, col: number): boolean => {
        try {
            const cell = boardByRow[row][col]
            return true;
        } catch {
            return false;
        };
    };
    
    for (let i = 0; i < boardByRow.length; i++) {
        for (let j = 0; j < boardByRow[i].length; j++) {
            if (boardByRow[i][j].mine) {
                if (cellExists(i - 1, j - 1)) expect(boardByRow[i - 1][j - 1].value).toBeGreaterThan(0);
                if (cellExists(i - 1, j)) expect(boardByRow[i - 1][j].value).toBeGreaterThan(0);
                if (cellExists(i - 1, j + 1)) expect(boardByRow[i - 1][j + 1]).toBeGreaterThan(0);
                if (cellExists(i, j - 1)) expect(boardByRow[i][j - 1]).toBeGreaterThan(0);
                if (cellExists(i, j + 1)) expect(boardByRow[i][j + 1]).toBeGreaterThan(0);
                if (cellExists(i + 1, j - 1)) expect(boardByRow[i + 1][j - 1]).toBeGreaterThan(0);
                if (cellExists(i + 1, j)) expect(boardByRow[i + 1][j]).toBeGreaterThan(0);
                if (cellExists(i + 1, j + 1)) expect(boardByRow[i + 1][j]).toBeGreaterThan(0);
            }
        }
    }
};
