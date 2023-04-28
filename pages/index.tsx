import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { useGameContext } from '../context/game';

import Layout from '../layouts';
import Prompt from '../components/prompt';
import Dialog from '../components/dialog';
import Game from '../components/game';

const PATH = process.env.INSTALL_PATH || '';

export default function Index (): JSX.Element {
    const { state, dispatch } = useGameContext();
    const { names, player, tie, winner } = state;
    const [prompt, setPrompt] = useState<boolean>(false);
    const { push } = useRouter();

    const reset = () => dispatch({
        type: 'Restart Game',
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
            <section>
                <h2>Knots and Crosses!</h2>
                {names && (
                    <p>
                        <a href={names[1] === '' ? `${PATH}/single/` : `${PATH}/`}>Continue</a>
                    </p>
                )}
                <p>
                    <a onClick={() => reset()} href={`${PATH}/single/`}>1 Player</a>
                </p>
                <p>
                    <a onClick={() => reset()} href={`${PATH}/local/`}>2 Players</a>
                </p>
            </section>
        </Layout>
    )
}
