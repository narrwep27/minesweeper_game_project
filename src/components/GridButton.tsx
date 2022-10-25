import { useState } from "react";
import "../styles/components/GridButton.css";

type Props = {
    name: string;
    content: string;
}

const GridButton = ({ name, content }: Props): JSX.Element => {
    const [revealed, setRevealed] = useState(false);
    
    const handleClick = () => setRevealed(true);
    
    return (
        <button 
            className="GridButton" 
            name={name} 
            onClick={handleClick}
            disabled={revealed}
        >
            {revealed && content}
        </button>
    );
};

export default GridButton;
