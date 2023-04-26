import React from 'react';

import { useGameContext } from '../context/game';

import Board from './board';
import Area from './area';
import Piece from './piece';

const positions = [
    "top left",
    "top center",
    "top right",
    "middle left",
    "middle center",
    "middle right",
    "bottom left",
    "bottom center",
    "bottom right",
]

const combinations = [
    [0, 1, 2], // top row
    [3, 4, 5], // middle row
    [6, 7, 8], // bottom row
    [0, 3, 6], // left column
    [1, 4, 7], // center column
    [2, 5, 8], // right column
    [0, 4, 8], // top left to bottom right
    [2, 4, 6], // top right to bottom left
];


export default function Game (): JSX.Element {
    const { state, dispatch } = useGameContext();
    const { x, o, turn, winner, draw, line } = state;

    const click = (position: number): void => {
        if (winner || x.includes(position) || o.includes(position)) {
            return;
        }

        dispatch({
            type: `Set ${turn}`,
            value: position
        });

        dispatch({
            type: `Next Turn`,
        });

        combinations.some((combination, index) => {
            const match = combination.every(value => [...(turn === 'X' ? x : o), position].includes(value));

            if (match) {
                dispatch({
                    type: 'Set Line',
                    value: combinations[index],
                });

                dispatch({
                    type: 'Set Winner',
                    value: turn,
                });
            }

            return match;
            
        });
    }

    return (
        <Board turn={turn} winner={winner}>
            {positions.map((position, index) => (
                <Area key={index} position={position} win={line?.includes(index)} onClick={() => click(index)}>
                    <Piece occupied={x.includes(index) && 'X' || o.includes(index) && 'O' || null}  />
                </Area>
            ))}
        </Board>
    )
}
