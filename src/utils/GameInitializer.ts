import Mode from "../models/Mode";
import Cell from "../models/Cell";

const CreateGameBoard = (mode: Mode): Cell[] | null => {
    if (!mode) return null;

    let rowCount: number = 0;
    let colCount: number = 0;
    if (mode === Mode.Beginner) [rowCount, colCount] = [9, 9];
    if (mode === Mode.Intermediate) [rowCount, colCount] = [16, 16];
    if (mode === Mode.Expert) [rowCount, colCount] = [16, 30];

    const gameBoard: Cell[] = [];
    for (let x = 0; x < colCount; x++) {
        for (let y = 0; y < rowCount; y++) {
            gameBoard.push({
                value: 0,
                revealed: false,
                flagged: false,
                x: x,
                y: y
            })
        }
    }

    return gameBoard;
};

export {
    CreateGameBoard
};
