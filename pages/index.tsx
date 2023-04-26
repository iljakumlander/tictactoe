import React from 'react';

import { useGameContext } from '../context/game';

import Layout from '../layouts';
import Game from '../components/game';

export default function Index (): JSX.Element {
    const { state, dispatch } = useGameContext();
    const { winner } = state;

    const newGame = () => dispatch({
        type: 'New Game',
    });

    return (
        <Layout title="Knots and crosses">
            {winner && (
                <div className="dialog">
                    <h1>Winner: {winner}</h1>
                    <p>
                        <button onClick={() => newGame()}>Play again</button>
                    </p>
                </div>
            )}
            <Game />
        </Layout>
    )
}
