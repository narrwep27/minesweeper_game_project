import { useState, useEffect } from "react";
import GameHeader from "./GameHeader";
import Cell from "../models/Cell";
import Mode from "../models/Mode";
import { createGameBoard } from "../utils/GameUtils";
import "../styles/components/GameBoard.css";

const GameBoard = () => {
    const [mode, setMode] = useState<Mode>(Mode.Beginner);
    const [board, setBoard] = useState<Cell[] | null>(null);

    const handleClick = () => {};

    useEffect(() => {
        setBoard(createGameBoard(mode));
    }, [mode]);
    
    return (
        <div className="GameBoard" data-testid="GameBoard">
            <GameHeader mode={mode} setMode={setMode} />
            <div className={`GameBoard-grid ${mode}`}>
                {board?.map((cell) => (
                    <button 
                        key={`r${cell.row}c${cell.col}`}
                        className={`GameBoard-grid-cell`}
                        onClick={handleClick}
                        >
                        {cell.value ? cell.value : null}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default GameBoard;
