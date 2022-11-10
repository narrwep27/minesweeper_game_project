import Cell from "../../models/Cell";
import Mode from "../../models/Mode";
import { 
    createGameBoard,
    orderCellsByRow
} from "../../utils/GameBoardUtils";

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
});
