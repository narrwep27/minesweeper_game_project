import Cell from "../../models/Cell";
import Mode from "../../models/Mode";
import { 
    createGameBoard, 
    initializeMines, 
    getRandIntMaxExclusive 
} from "../../utils/GameUtils";

const countMines = (gameBoard: Cell[]): number => {
    let mineCount = 0;
    for (let i = 0; i < gameBoard.length; i++) {
        if (gameBoard[i].mine) mineCount++;
    };
    return mineCount;
};

describe('GameUtils', () => {
    test('createGameBoard returns expected cell length depending on mode', () => {
        const begBoard = createGameBoard(Mode.Beginner);
        expect(begBoard).toHaveLength(81);

        const intBoard = createGameBoard(Mode.Intermediate);
        expect(intBoard).toHaveLength(256);

        const expBoard = createGameBoard(Mode.Expert);
        expect(expBoard).toHaveLength(480);
    });

    test('initializeMines returns proper number of mines with different modes', () => {
        let mineCount: number;

        const begBoard = initializeMines(0, createGameBoard(Mode.Beginner));
        mineCount = countMines(begBoard);
        expect(mineCount).toBe(10);

        const intBoard = initializeMines(0, createGameBoard(Mode.Intermediate));
        mineCount = countMines(intBoard);
        expect(mineCount).toBe(40);

        const expBoard = initializeMines(0, createGameBoard(Mode.Expert));
        mineCount = countMines(expBoard);
        expect(mineCount).toBe(99);
    });

    test('initilizeMines never sets mine at starting index', () => {
        let startInd = getRandIntMaxExclusive(0, 81);
        const begBoard = initializeMines(startInd, createGameBoard(Mode.Beginner));
        expect(begBoard[startInd].mine).toBeFalsy();

        startInd = getRandIntMaxExclusive(0, 256);
        const intBoard = initializeMines(startInd, createGameBoard(Mode.Intermediate));
        expect(intBoard[startInd].mine).toBeFalsy();

        startInd = getRandIntMaxExclusive(0, 480);
        const expBoard = initializeMines(startInd, createGameBoard(Mode.Expert));
        expect(expBoard[startInd].mine).toBeFalsy();
    });
});
