import React from 'react';
import { useGameContext } from '../context/game';

import Layout from '../layouts';


export default function Index (): JSX.Element {
    const { state, dispatch } = useGameContext();
    const { names } = state;

    const reset = () => dispatch({
        type: 'Restart Game',
    });

    return (
        <Layout title="Knots and crosses">
            <section>
                <h2>Knots and Crosses!</h2>
                {names && (
                    <p>
                        <a href={names[1] === '' ? 'single/' : 'local/'}>Continue</a>
                    </p>
                )}
                <p>
                    <a onClick={() => reset()} href="single/">1 Player</a>
                </p>
                <p>
                    <a onClick={() => reset()} href="local/">2 Players</a>
                </p>
            </section>
        </Layout>
    )
}
