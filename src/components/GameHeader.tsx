import React from "react";
import Mode from "../models/Mode";
import "../styles/components/GameHeader.css";

type Props = {
    mode: Mode;
    setMode: React.Dispatch<React.SetStateAction<Mode>>;
}

const GameHeader = ({ mode, setMode }: Props) => {
    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        if (e.target.value === Mode.Beginner) setMode(Mode.Beginner);
        if (e.target.value === Mode.Intermediate) setMode(Mode.Intermediate);
        if (e.target.value === Mode.Expert) setMode(Mode.Expert);
    };
    
    return (
        <div className="GameHeader" data-testid="GameHeader">
            <h1>Minesweeper</h1>
            <div className="GameHeader-controls">
                <div className="GameHeader-controls-control">
                    <select 
                        className="GameHeader-controls-control-select"
                        value={mode} 
                        onChange={handleChange}
                        >
                        <option value={Mode.Beginner}>Beginner</option>
                        <option value={Mode.Intermediate}>Intermediate</option>
                        <option value={Mode.Expert}>Expert</option>
                    </select>
                </div>
                <div className="GameHeader-controls-control">
                    <button className="GameHeader-controls-control-button">&#128512;</button>
                </div>
                <div className="GameHeader-controls-control">
                    timer
                </div>
            </div>
        </div>
    );
};

export default GameHeader;
