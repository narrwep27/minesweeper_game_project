type Cell = {
    value: string | number;
    revealed: boolean;
    flagged: boolean;
    x: number;
    y: number
};

export default Cell;
