import { FunctionComponent } from "react";

interface GameOverProps {
    score: number,
    bestScore: number,
    onRestart: () => void,
    children?: JSX.Element
}


const GameOver: FunctionComponent<GameOverProps> = ({ score, bestScore, onRestart, children }) => {
    return (
        <div className="display-gameover">
            <p className="title-game-over">Game Over</p>

            {children}

            <p className="result">Vous avez atteint un score de {score} 🏅<br /><em>Votre meilleur score: {bestScore} 🥇</em></p>
            <button className="btn" onClick={() => onRestart()}>Recommencer</button>
        </div>
    );
};

export default GameOver;