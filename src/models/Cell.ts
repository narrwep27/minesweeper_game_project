type Cell = {
    value: number;
    mine: boolean;
    revealed: boolean;
    flagged: boolean;
    row: number;
    col: number
};

export default Cell;
