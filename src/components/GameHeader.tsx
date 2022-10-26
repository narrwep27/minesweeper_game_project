import React from "react";
import Mode from "../models/Mode";
import "../styles/components/GameHeader.css";

type Props = {
    setMode: React.Dispatch<React.SetStateAction<Mode | null>>
}

const GameHeader = ({ setMode }: Props) => {
    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        if (e.target.value === "beginner") setMode(Mode.Beginner);
        if (e.target.value === "intermediate") setMode(Mode.Intermediate);
        if (e.target.value === "expert") setMode(Mode.Expert);
    };
    
    return (
        <div className="GameHeader">
            <h1>Minesweeper</h1>
            <div className="GameHeader-controls">
                <select value="beginner" onChange={handleChange}>
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="expert">Expert</option>
                </select>
                <button>&#128512;</button>
                <div>
                    timer
                </div>
            </div>
        </div>
    );
};

export default GameHeader;
