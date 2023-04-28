import React, { useEffect } from 'react';

import { useGameContext, combinations } from '../context/game';

const CORNERS = [0, 2, 6, 8];
const CENTER = 4;
const EDGES = [1, 3, 5, 7];

export default function Computer (): JSX.Element {
    const { state, dispatch } = useGameContext();
    const { x, o, names, player, starts, turn, winner, tie } = state;

    const compute = () => {
        if (player === 0 || winner || tie) {
            return;
        }

        const computer = starts === 1 ? x : o;
        const opponent = starts === 0 ? x : o;

        if (starts === 0) {
            if (opponent.length === 1) {
                if (CORNERS.includes(opponent[0]) || EDGES.includes(opponent[0])) {
                    dispatch({
                        type: `Set`,
                        value: CENTER,
                    });

                    return;
                }

                if (opponent[0] === CENTER) {
                    dispatch({
                        type: `Set`,
                        value: CORNERS.sort(() => 0.5 - Math.random())[0],
                    });
        
                    return;
                }
            }
            
        }

        if (starts === 1) {
            if (opponent.length + computer.length === 0) {
                dispatch({
                    type: `Set`,
                    value: CORNERS.sort(() => 0.5 - Math.random()).filter(edge => !opponent.includes(edge) && !computer.includes(edge))[0],
                });
    
                return;
            }

            if (opponent.length === 1) {
                if ((CORNERS.includes(opponent[0]) || EDGES.includes(opponent[0])) && opponent[0] !== CENTER) {
                    dispatch({
                        type: `Set`,
                        value: CENTER,
                    });

                    return;
                }

                if (opponent[0] === CENTER) {
                    dispatch({
                        type: `Set`,
                        value: CORNERS.sort(() => 0.5 - Math.random()).filter(edge => !opponent.includes(edge) && !computer.includes(edge))[0],
                    });
        
                    return;
                }
            }
        }

        let move = -1;

        if (opponent.length >= 2) {
            const matches = [];

            for (let i = 0; i < computer.length; i++) {
                const found = combinations.find(combination => combination.includes(computer[i]) && opponent.every(area => !combination.includes(area)));

                if (!found) {
                    continue;
                }
                
                matches.push(found);
            }

            move = matches.length > 0 ? matches[0].filter(value => !computer.includes(value)).sort(() => 0.5 - Math.random())[0] : -1;
        }
        
        dispatch({
            type: `Set`,
            value: typeof move === 'undefined' || move === -1 ? [...EDGES, ...CORNERS, CENTER].filter(value => !computer.includes(value) && !opponent.includes(value)).sort(() => 0.5 - Math.random())[0] : move,
        });
    }

    useEffect((): void => {
        if (!names) {
            return;
        }

        compute();
    }, [player, turn, winner, tie]);

    return null;
}
