import React from 'react';

interface PropsStartingScreen {
    onStart: () => void
}

const StartingScreen: React.FC<PropsStartingScreen> = ({ onStart }) => {
    return (
        <button className="btn" onClick={onStart}>Commencer</button>
    );
};

export default StartingScreen;