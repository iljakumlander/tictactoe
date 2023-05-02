import React, { useState, useEffect } from 'react';

import { useGameContext } from '../context/game';

import Layout from '../layouts';
import Prompt from '../components/prompt';
import Dialog from '../components/dialog';
import Game from '../components/game';
import Computer from '../modules/computer';

export default function Index (): JSX.Element {
    const { state, dispatch } = useGameContext();
    const { names, player, tie, winner } = state;
    const [prompt, setPrompt] = useState<boolean>(false);

    const newGame = () => dispatch({
        type: 'New Game',
    });

    const newPlayers = (values: string[]) => dispatch({
        type: 'Set Names',
        value: values,
    });

    useEffect(() => {
        if (!names) {
            setPrompt(true);
        }
        
        else {
            setPrompt(false);
        }
    }, [names]);
    

    return (
        <Layout title="Knots and crosses">
            {winner && (
                <Dialog title="Winner">
                    <h2>{names[player] === '' ? (<em>Computer</em>) : names[player]} wins!</h2>
                    <p>
                        <button onClick={() => newGame()}>Play again</button>
                    </p>
                    <p>
                        <a href="../" className="button">Cancel</a>
                    </p>
                </Dialog>
            )}

            {tie && (
                <Dialog title="Tie">
                    <h2>A Tie!</h2>
                    <p>
                        <button onClick={() => newGame()}>Play again</button>
                    </p>
                    <p>
                        <a href="../" className="button">Cancel</a>
                    </p>
                </Dialog>
            )}

            <Computer />

            <Game />
                
            {prompt && (
                <Prompt onSubmit={newPlayers} title="Player name" single={true} action="Play" />
            )}
        </Layout>
    )
}
