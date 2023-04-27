import React, { useState, useRef } from 'react';

import { useGameContext, positions, combinations } from '../context/game';

import Board from './board';
import Area from './area';
import Piece from './piece';
import Notification from './notification';

export default function Game (): JSX.Element {
    const { state, dispatch } = useGameContext();
    const { x, o, turn, winner, tie, line } = state;
    const board = useRef(null);
    const focus = useRef([]);
    const [lock, setLock] = useState<boolean>(true);
    const [notification, setNotification] = useState<JSX.Element | null>(null);
    const [input, setInput] = useState<string>('none');

    const react = (area: number): void => {
        if (tie || winner || x.includes(area) || o.includes(area)) {
            notify('Invalid move');

            return;
        }

        dispatch({
            type: `Set`,
            value: area,
        });
    };

    const notify = (message: string) => setNotification(<Notification message={message} expire={Date.now()} />);

    const click = (event: React.MouseEvent, area: number): void => {
        setInput(event.type);
        react(area);
    };

    const press = (event: React.KeyboardEvent, area: number): void => {
        setInput(event.type);
        setLock(false);
        
        if (event.key === 'Enter' || event.key === ' ') {
            react(area);
        }

        if (event.key === 'ArrowUp') {
            focus.current[[0, 1, 2].includes(area) ? area + 6 : area - 3]?.focus();
        }

        if (event.key === 'ArrowRight') {
            focus.current[[2, 5, 8].includes(area) ? area - 2 : area + 1]?.focus();
        }

        if (event.key === 'ArrowDown') {
            focus.current[[6, 7, 8].includes(area) ? area - 6 : area + 3]?.focus();
        }

        if (event.key === 'ArrowLeft') {
            focus.current[[0, 3, 6].includes(area) ? area + 2 : area - 1]?.focus();
        }
    };

    const focused = () => {
        if (!lock) {
            return;
        }
        
        focus.current[4]?.focus();
    };

    return (
        <Board reference={board} turn={turn} winner={winner} focus={focused} input={input}>
            {notification}
            {positions.map((position, index) => (
                <Area reference={(el) => (focus.current[index] = el)} key={index} position={position} win={line?.includes(index)} onClick={event => click(event, index)} onKeyDown={event => press(event, index)}>
                    <Piece occupied={x.includes(index) && 'X' || o.includes(index) && 'O' || null}  />
                </Area>
            ))}
        </Board>
    )
}
