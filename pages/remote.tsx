import React, { useEffect, useState } from 'react';
import io from 'Socket.IO-client';

import { useGameContext } from '../context/game';

import Layout from '../layouts';
import Game from '../components/game';
import Prompt from '../components/prompt';
import Dialog from '../components/dialog';
import Notification from '../components/notification';

interface RemotePlayer {
    id: string;
    name: string;
}

interface RemoteMove {
    to?: string;
    from?: string;
    area?: number;
}

let socket;

export default function Remote (): JSX.Element {
    const { state, dispatch } = useGameContext();
    const { x, o, names, remote, player, tie, winner } = state;
    const [prompt, setPrompt] = useState<boolean>(false);
    const [notifications, setNotifications] = useState<JSX.Element[]>([]);
    const [established, setEstablished] = useState<boolean>(false);

    const notify = (message: string) => setNotifications([...notifications, <Notification message={message} expire={Date.now()} />]);

    const socketInitializer = async () => {
        socket = io('https://tictactoe-remote.herokuapp.com/', { secure: true, transports: ['websocket'] });

        console.log('state', state);

        console.log('socket', socket)

        socket.on('connect', () => {
            console.log('connected')
        });
    }

    const newPlayers = (values: string[]) => {
        socket.emit('player ready', values[0]);

        dispatch({
            type: 'Set Names',
            value: values,
        })
    };

    const newGame = () => {
        dispatch({
            type: 'New Game',
        })
    };

    const react = (area: number): void => {
        if (player === 1 || tie || winner || x.includes(area) || o.includes(area)) {
            notify('Invalid move');

            return;
        }

        socket.emit('player move', {
            to: remote,
            from: socket.id,
            area,
        });

        dispatch({
            type: `Set`,
            value: area,    
        });
    };

    useEffect(() => {
        socketInitializer();
    }, []);

    useEffect(() => {
        if (!names) {
            setPrompt(true);

            return;
        }
        
        else {
            setPrompt(false);
        }

        if (established) {
            return;
        }

        console.log('names', names);

        socket.emit('player ready', names[0]);

        socket.on('player ready', (player: RemotePlayer) => {
            if (player.id === socket.id) {
                return;
            }

            if (remote || names[1] === player.name) {
                return;
            }

            setEstablished(true);

            console.log('setEstablished', player.id);

            dispatch({
                type: 'Set Names',
                value: [names[0], player.name],
            });

            dispatch({
                type: 'Set Remote',
                value: player.id,
            });

            dispatch({
                type: 'New Remote Game',
                value: 1,
            });
        });

        socket.on('user disconnected', (id: string) => {
            if (!remote || remote !== id) {
                return;
            }

            console.log('disconnect', id)

            if (id === remote) {
                dispatch({
                    type: 'Set Names',
                    value: [names[0], ''],
                });
                
                dispatch({
                    type: 'Set Remote',
                    value: null,
                })

                setEstablished(false);
            };
        });
    }, [names]);

    useEffect(() => {
        socket.on('player move', (move: RemoteMove) => {
            console.log('move', move, remote, move.from, remote === move.from);
            if (!remote || remote !== move.from) {
                return;
            }

            dispatch({
                type: `Set`,
                value: move.area,    
            });
        });
    }, [remote]);

    useEffect(() => {
        console.log('established', established)
        if (!established) {
            return;
        }

        dispatch({
            type: 'New Remote Game',
            value: 0,
        });

        
    }, [established]);
    
    return (
        <Layout title="Remote">
            {notifications.map((notification, index) => <React.Fragment key={index}>{notification}</React.Fragment>)}
            {winner && (
                <Dialog title="Winner">
                    <h2><em>{names[player]} wins!</em></h2>
                    <p>
                        <button onClick={() => newGame()}>Play again</button>
                    </p>
                </Dialog>
            )}
            {!remote && (
                <section>
                    <h2>Waiting for player...</h2>
                </section>
            )}
            <Game interceptor={react} />
            {prompt && (
                <Prompt onSubmit={newPlayers} title="Player name" single={true} action="Play" />
            )}
        </Layout>
    )
}
