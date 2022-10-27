type Cell = {
    value: string | number;
    revealed: boolean;
    flagged: boolean;
    row: number;
    col: number
};

export default Cell;
