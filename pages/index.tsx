import React from 'react';
import { config } from '../config';
import { useGameContext } from '../context/game';
import Layout from '../layouts';

export default function Index (): JSX.Element {
    const { state, dispatch } = useGameContext();
    const { names, remote } = state;
    const { host } = config.server;

    const reset = () => dispatch({
        type: 'Restart Game',
    });

    return (
        <Layout title="Knots and crosses">
            <section>
                <h1>Knots and&nbsp;Crosses!</h1>
                {names && (
                    <p>
                        <a href={names[1] === '' ? 'single/' : remote ? 'remote/' : 'local/'}>Continue</a>
                    </p>
                )}
                <p>
                    <a onClick={() => reset()} href="single/">1 Player</a>
                </p>
                <p>
                    <a onClick={() => reset()} href="local/">2 Players</a>
                </p>
                {host && (
                    <p>
                        <a onClick={() => reset()} href="remote/">Online</a>
                    </p>
                )}
            </section>
        </Layout>
    )
}
