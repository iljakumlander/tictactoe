import React, { useEffect, useState } from 'react';

import { useGameContext } from '../context/game';
import { useNotificationContext, Announce } from '../context/notification';

import Layout from '../layouts';

import Online from '../modules/online';

import Game from '../components/game';
import Prompt from '../components/prompt';
import Dialog from '../components/dialog';
import Notification from '../components/notification';

export default function Remote (): JSX.Element {
    const { state, dispatch } = useGameContext();
    const { announcer } = useNotificationContext();
    const { names, connected, player, tie, winner } = state;
    const [prompt, setPrompt] = useState<boolean>(false);

    const notify = (message: string) => announcer({
        type: Announce.New,
        value: <Notification message={message} expire={Date.now()} />,
    });

    const newPlayer = (values: string[]) => {
        notify(`${values[0]} set!`);

        dispatch({
            type: 'Status',
            value: `${values[0]} set!`,
        });

        dispatch({
            type: 'Set Names',
            value: values,
        });
    };

    const newGame = () => {
        notify(`Get Ready!!!`);

        dispatch({
            type: 'New Game',
        })

        dispatch({
            type: 'Status',
            value: `${player || player === 0 ? names[player] : 'Player not set'}`,
        });
    };

    useEffect(() => {
        if (!names) {
            setPrompt(true);

            return;
        }
        
        else {
            setPrompt(false);
        }
    }, [names]);

    useEffect(() => {
        if (!player) {
            return;
        }

        dispatch({
            type: 'Status',
            value: `${names[player]}`,
        });
        
    }, [player]);
    
    return (
        <Layout title="Remote">
            {winner && (
                <Dialog title="Winner">
                    <h2><em>{names[player]} wins!</em></h2>
                    <p>
                        <button onClick={() => newGame()}>Play again</button>
                    </p>
                </Dialog>
            )}

            {tie && (
                <Dialog title="Tie">
                    <h2>A Tie!</h2>
                    <p>
                        <button onClick={() => newGame()}>Play again</button>
                    </p>
                </Dialog>
            )}

            <Online />

            <Game hold={connected && player === 1} />

            {prompt && (
                <Prompt onSubmit={newPlayer} title="Player name" single={true} action="Play" />
            )}
        </Layout>
    );
}
