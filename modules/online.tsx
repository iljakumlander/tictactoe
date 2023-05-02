import React, { useState, useEffect } from 'react';
import io, { Socket } from 'socket.io-client';

import { config } from '../config';

import { useGameContext } from '../context/game';
import { useNotificationContext, Announce } from '../context/notification';

import Notification from '../components/notification';

interface Player {
    id: string;
    name: string;
    remote?: string,
}

interface Move {
    to?: string;
    from?: string;
    area?: number;
}

interface Game {
    to?: string;
    from?: string;
    datetime?: number;
}

export default function Online (): JSX.Element {
    const { host, opts } = config.server;
    const { state, dispatch } = useGameContext();
    const { announcer } = useNotificationContext();
    const { datetime, move, names, remote, connected } = state;
    const [socket, setSocket] = useState<Socket>(null);
    const [ready, setReady] = useState<boolean>(false);
    const [attempt, setAttempt] = useState<number>(0);

    const notify = (message: string) => announcer({
        type: Announce.New,
        value: <Notification message={message} expire={Date.now()} />,
    });

    useEffect(() => {
        setSocket(io(host, opts));
    }, []);

    useEffect(() => {
        if (!names || !names[0]) {
            return;
        }
        
        setReady(true);
    }, [names]);

    useEffect(() => {
        if (!ready) {
            return;
        }

        const reconnection = setInterval(() => setAttempt(number => number + 1), 1000);

        socket.on('player ready', (request: Player) => {
            if (request.id === socket.id || connected && connected !== request.id && connected !== request.remote) {
                return;
            }

            clearInterval(reconnection);

            if (
                !remote
                ||
                remote === socket.id && request.remote === request.id
                ||
                remote !== socket.id && request.remote !== request.id
            )
            
            {
                dispatch({
                    type: 'Set Remote',
                    value: request.id,
                });
            }

            dispatch({
                type: 'Set Connected',
                value: request.id,
            });

            dispatch({
                type: 'Status',
                value: `${request.name} joined!`,
            });

            dispatch({
                type: 'New Remote Game',
                value: 0,
            });
            
            socket.emit('player accept', {
                id: socket.id,
                name: names[0],
                remote: request.id,
            });
        });

        socket.on('player accepted', (request: Player) => {
            if (socket.id !== request.remote) {
                dispatch({
                    type: 'Remove Connected',
                })

                return;
            }

            clearInterval(reconnection);

            notify(`${request.name} joined!`);

            dispatch({
                type: 'Set Connected',
                value: request.id,
            });

            dispatch({
                type: 'Set Remote',
                value: request.remote,
            });

            dispatch({
                type: 'Set Names',
                value: [names[0], request.name],
            });

            if (remote === request.remote) {
                return;
            }

            dispatch({
                type: 'New Remote Game',
                value: 1,
            });
        });

        socket.on('player move', (move: Move) => {;
            dispatch({
                type: `Set`,
                value: move.area,
            });
        });

        socket.on('new game', (game: Game) => {;
            dispatch({
                type: 'New Game',
                value: game.datetime,
            })
        });
        
        socket.on('user disconnected', (id: string) => {
            if (connected && id !== connected) {
                return;
            }

            notify(`${names[1]} left`);

            dispatch({
                type: 'Remove Connected',
            })

            dispatch({
                type: 'Status',
                value: `Player left. Reconnecting...`,
            });

            socket.emit('player ready', {
                id: socket.id,
                name: names[0],
                remote: id,
            });
        });

        return () => clearInterval(reconnection);
    }, [ready]);

    useEffect(() => {
        if (!connected) {
            const reconnection = setInterval(() => setAttempt(number => number + 1), 1000);

            notify(`Disconnected!`);

            return () => clearInterval(reconnection);
        }

        notify(`Connected!`);
    }, [connected]);

    useEffect(() => {
        if (!socket) {
            dispatch({
                type: 'Status',
                value: `Connecting...`,
            });

            return;
        }

        if (!names) {
            dispatch({
                type: 'Status',
                value: `Waiting for player name...`,
            });

            return;
        }

        dispatch({
            type: 'Status',
            value: `Waiting for player... ${attempt}`,
        });

        socket.emit('player ready', {
            id: socket.id,
            name: names[0],
            remote: remote || socket.id,
        });
    }, [attempt]);

    useEffect(() => {
        if (!connected || (!move && move !== 0)) {
            return;
        }

        socket.emit('player move', {
            to: connected,
            from: socket.id,
            area: move,
        });
        
    }, [move]);

    useEffect(() => {
        if (!datetime || !connected) {
            return;
        }

        socket.emit('new game', {
            to: connected,
            from: socket.id,
            datetime,
        });
        
    }, [datetime]);

    return null;
}
