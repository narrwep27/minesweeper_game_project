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

        const begBoard = setMines(0, createGameBoard(Mode.Beginner));
        mineCount = countMines(begBoard);
        expect(mineCount).toBe(10);

        const intBoard = setMines(0, createGameBoard(Mode.Intermediate));
        mineCount = countMines(intBoard);
        expect(mineCount).toBe(40);

        const expBoard = setMines(0, createGameBoard(Mode.Expert));
        mineCount = countMines(expBoard);
        expect(mineCount).toBe(99);
    });

    test('setMines never sets mine at starting index', () => {
        let startInd = getRandIntMaxExclusive(0, 81);
        const begBoard = setMines(startInd, createGameBoard(Mode.Beginner));
        expect(begBoard[startInd].mine).toBeFalsy();

        startInd = getRandIntMaxExclusive(0, 256);
        const intBoard = setMines(startInd, createGameBoard(Mode.Intermediate));
        expect(intBoard[startInd].mine).toBeFalsy();

        startInd = getRandIntMaxExclusive(0, 480);
        const expBoard = setMines(startInd, createGameBoard(Mode.Expert));
        expect(expBoard[startInd].mine).toBeFalsy();
    });

    test('initializeMineCounts counts adjacent mines', () => {
        const begBoardByRow = orderCellsByRow(createGameBoard(Mode.Beginner));
        const intBoardByRow = orderCellsByRow(createGameBoard(Mode.Intermediate));
        const expBoardByRow = orderCellsByRow(createGameBoard(Mode.Expert));
    });
});