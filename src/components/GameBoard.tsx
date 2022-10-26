import { useState, useEffect } from "react";
import GameHeader from "./GameHeader";
import Mode from "../models/Mode";
import { CreateGameBoard } from "../utils/GameInitializer";

const GameBoard = () => {
    const [mode, setMode] = useState<Mode | null>(null);
    
    return (
        <div className="GameBoard">
            <GameHeader setMode={setMode} />
        </div>
    );
};

export default GameBoard;
