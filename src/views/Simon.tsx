import { useState } from "react";
import { GameState } from "../models/game.ts";
import GameOver from "../components/GameOver.tsx";

const Simon: React.FC = () => {
    const NB_SQUARES_LINE = 3;
    const NB_SQUARES_COLUMNS = 3;

    const [sequence, setSequence] = useState<number[]>([])
    const [currentBlocSequence, setCurrentBlocSequence] = useState<number | null>()
    const [currentIndexCheck, setCurrentIndexCheck] = useState<number>(0)
    const [gamePhase, setGamePhase] = useState<GameState>(GameState.Visualizing)
    const [bestScore, setBestScore] = useState<number>(0)


    const addToSequence = (_sequence: number[] = sequence): number[] => {
        const random: number = Math.floor(Math.random() * 9);
        _sequence.push(random)
        setSequence(_sequence);
        return _sequence;
    };

    const visualizeSequence = (_sequence: number[] = sequence): void => {
        setGamePhase(GameState.Visualizing)
        let index = 0;
        const interval = setInterval(() => {
            setCurrentBlocSequence(_sequence[index]);
            setTimeout(() => {
                setCurrentBlocSequence(null)
            }, 750)
            index++;
            if (index >= sequence.length) {
                clearInterval(interval);
                setTimeout(() => {
                    setCurrentBlocSequence(null);
                    setGamePhase(GameState.Playing)
                }, 1000);
            }
        }, 1000);
    };


    const checkInSequence = (index: number): void => {
        if (gamePhase === GameState.Playing) {
            if (sequence[currentIndexCheck] === index) {
                setCurrentIndexCheck((prev) => prev + 1)

                if (sequence.length - 1 === currentIndexCheck) {
                    const temp_sequence = addToSequence();
                    visualizeSequence(temp_sequence)
                    setCurrentIndexCheck(0)
                }
            }
            else {
                setGamePhase(GameState.GameOver);
                isBestScore(sequence.length)
            }
        }
    }

    const isBestScore = (score: number): void => {
        if (bestScore < score) {
            setBestScore(score)
        }
    }

    const startGame = (): void => {
        setSequence([])
        setCurrentIndexCheck(0)
        const temp_sequence = addToSequence([]);
        visualizeSequence(temp_sequence)
    }

    return (
        <div className="game">
            {gamePhase === GameState.GameOver ?
                <GameOver score={sequence.length} bestScore={bestScore} onRestart={startGame} />
                :
                <>
                    <div className="level">Niveau {sequence.length}</div>
                    <div className={`container-simon ${GameState.Playing === gamePhase ? '' : 'disabled'}`}>
                        {Array.from({ length: NB_SQUARES_LINE * NB_SQUARES_COLUMNS }).map((_v, index) => {
                            return <div key={index}
                                className={`ripple-button bloc ${currentBlocSequence === index ? "sequence-point" : ""}`}
                                onClick={() => checkInSequence(index)}>
                            </div>
                        })}
                    </div>
                    <button className="btn" onClick={() => startGame()}>{sequence.length === 0 ? "Commencer" : "Recommencer"}</button>
                </>
            }
        </div>
    );
};

export default Simon;