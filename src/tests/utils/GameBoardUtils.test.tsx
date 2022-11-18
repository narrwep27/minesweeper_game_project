import Cell from "../../models/Cell";
import Mode from "../../models/Mode";
import { 
    createGameBoard,
    orderCellsByRow,
    toggleFlag,
    revealCellAndAdj
} from "../../utils/GameBoardUtils";
import { getRandIndForMode } from "../../utils/MineUtils";

describe('GameBoardUtils', () => {
    test('createGameBoard returns expected cell length depending on mode', () => {
        const begBoard = createGameBoard(Mode.Beginner);
        expect(begBoard).toHaveLength(81);

        const intBoard = createGameBoard(Mode.Intermediate);
        expect(intBoard).toHaveLength(256);

        const expBoard = createGameBoard(Mode.Expert);
        expect(expBoard).toHaveLength(480);
    });

    test('orderCellsByRow returns correct length of rows and columns', () => {
        const begBoard = orderCellsByRow(createGameBoard(Mode.Beginner));
        expect(begBoard).toHaveLength(9);
        for (let row of begBoard) expect(row).toHaveLength(9);

        const intBoard = orderCellsByRow(createGameBoard(Mode.Intermediate));
        expect(intBoard).toHaveLength(16);
        for (let row of intBoard) expect(row).toHaveLength(16);
        
        const expBoard = orderCellsByRow(createGameBoard(Mode.Expert));
        expect(expBoard).toHaveLength(16);
        for (let row of expBoard) expect(row).toHaveLength(30);
    });

    test('toggleFlag toggles flag of specified cell', () => {
        let rand = getRandIndForMode(Mode.Beginner);
        const begBoard = createGameBoard(Mode.Beginner);
        toggleFlag(begBoard[rand]);
        expect(begBoard[rand].flagged).toBe(true);
        toggleFlag(begBoard[rand]);
        expect(begBoard[rand].flagged).toBe(false);

        rand = getRandIndForMode(Mode.Intermediate);
        const intBoard = createGameBoard(Mode.Intermediate);
        toggleFlag(intBoard[rand]);
        expect(intBoard[rand].flagged).toBe(true);
        toggleFlag(intBoard[rand]);
        expect(intBoard[rand].flagged).toBe(false);

        rand = getRandIndForMode(Mode.Expert);
        const expBoard = createGameBoard(Mode.Expert);
        toggleFlag(expBoard[rand]);
        expect(expBoard[rand].flagged).toBe(true);
        toggleFlag(expBoard[rand]);
        expect(expBoard[rand].flagged).toBe(false);
    });
});
