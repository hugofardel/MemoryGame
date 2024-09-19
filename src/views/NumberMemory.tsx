import { FunctionComponent, useReducer, useState } from 'react';
import GameOver from '../components/GameOver.tsx';
import StartingScreen from '../components/StartingScreen.tsx';
import { numberMemoryReducer, initialState } from '../reducers/NumberMemoryReducer.ts';

const MEMORIZATION_TIME: number = 3000

const NumberMemory: FunctionComponent = () => {
    const [{ sequence, score, status, bestScore }, dispatch] = useReducer(numberMemoryReducer, initialState)
    const [input, setInput] = useState<string>("")

    const startGame = (): void => {
        dispatch({ type: "START_GAME" })
        setInput("")
        changeStatusWithDelay()
    }

    const validSequence = () => {
        if (sequence === input) {
            dispatch({ type: "NIVEAU_SUIVANT" })
            setInput('')
            changeStatusWithDelay()
        }
        else {
            dispatch({ type: "END_GAME" })
        }
    }

    const changeStatusWithDelay = () => {
        setTimeout(() => {
            dispatch({ type: "CHANGE_STATUS", payload: "started" })
        }, MEMORIZATION_TIME)
    }

    const handleInputKey: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
        if (e.key === "Enter") {
            validSequence();
        }
    }

    const highlightInput = () => {
        return input.split('').map((char, index) => {
            if (char === sequence?.[index]) {
                return <span className='correct' key={index}>{char}</span>;
            } else {
                return <span className="incorrect" key={index}>{char}</span>;
            }
        });
    }

    return (
        <div className="number-memory-game game">

            {status === "notstarted" && <StartingScreen onStart={startGame} />}

            {status === "visualizing" && (
                <>
                    <div className="level">Niveau {score + 1}</div>
                    <p className='bold ft-huge'>{sequence}</p>
                </>
            )}

            {status === "started" && (
                <>
                    <div className="level">Niveau {score + 1}</div>
                    <div className="reponse-sequence">
                        <input type="number" autoFocus value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={handleInputKey} />
                        <button type="button" className='btn' onClick={() => validSequence()}>Valider</button>
                    </div>
                </>
            )}

            {status === "finished" && (
                <GameOver score={score} bestScore={bestScore} onRestart={startGame}>
                    <p className='compare-answer'>Votre réponse: {highlightInput()}<br />Réponse attendue: {sequence}</p>
                </GameOver>
            )}
        </div>
    );
};

export default NumberMemory;