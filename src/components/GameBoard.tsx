import { useState, useEffect } from "react";
import GameHeader from "./GameHeader";
import Cell from "../models/Cell";
import Mode from "../models/Mode";
import { CreateGameBoard } from "../utils/GameUtils";
import "../styles/components/GameBoard.css";

const GameBoard = () => {
    const [mode, setMode] = useState<Mode>(Mode.Beginner);
    const [board, setBoard] = useState<Cell[] | null>(null);

    const handleClick = () => {};

    useEffect(() => {
        if (mode === Mode.Beginner) setBoard(CreateGameBoard(Mode.Beginner));
        if (mode === Mode.Intermediate) setBoard(CreateGameBoard(Mode.Intermediate));
        if (mode === Mode.Expert) setBoard(CreateGameBoard(Mode.Expert));
    }, [mode]);
    
    return (
        <div className="GameBoard">
            <GameHeader mode={mode} setMode={setMode} />
            <div className={`GameBoard-grid ${mode}`}>
                {board?.map((cell) => (
                    <button 
                        key={`r${cell.row}c${cell.col}`}
                        className={`GameBoard-grid-cell`}
                        onClick={handleClick}
                        >
                        {cell.value ? cell.value : ""}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default GameBoard;
