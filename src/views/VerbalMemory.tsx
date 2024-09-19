import React, { useReducer } from 'react';
import StartingScreen from '../components/StartingScreen.tsx';
import GameOver from '../components/GameOver.tsx';
import { verbalMemoryReducer, initialState } from '../reducers/VerbalMemoryReducer.ts';

const VerbalMemory: React.FC = () => {
    const [{ score, currentWord, status, wordsSeen }, dispatch] = useReducer(verbalMemoryReducer, initialState)

    const handleGuess = (isSeen: boolean) => {
        const responseIsSeen = wordsSeen.includes(currentWord);
        if (isSeen === responseIsSeen) {
            dispatch({ type: "GENERATE_WORD" })
        }
        else {
            dispatch({ type: "END_GAME" })
        }
    }

    const handleStart = () => {
        dispatch({ type: 'START_GAME' })
    }

    return (
        <div className="game">

            {status === "notstarted" && <StartingScreen onStart={handleStart} />}
            {status === "finished" && <GameOver onRestart={handleStart} bestScore={score} score={score} />}

            {status === "started" &&
                <>
                    <div className="level">Score: {score}</div>

                    <p className='ft-huge bold'>{currentWord}</p>

                    <div className='buttons-container'>
                        <button className='btn' onClick={() => handleGuess(true)}>Déjà vu</button>
                        <button className='btn' onClick={() => handleGuess(false)}>Nouveau</button>
                    </div>
                </>
            }
        </div>
    );
};

export default VerbalMemory;