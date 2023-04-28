import React, { createContext, useContext, useMemo, useEffect, useReducer, Dispatch } from "react";

export interface Scores {
    [key: string]: Player;
}

export interface Player {
    wins: number;
    ties: number;
    losses: number;
    total: number;
}

export interface Game {
    names?: string[];
    player?: number;
    starts?: number,
    x: number[];
    o: number[];
    turn?: string;
    winner?: string;
    line?: number[];
    tie?: boolean;
    leaderboard?: Scores;
    remote?: string;
};

export interface Action {
    type: string;
    value?: number | string | number[] | string[] | boolean | Game | Player;
}

export const newGame: Game = {
    x: [],
    o: [],
    turn: 'X',
};

export const newPlayer: Player = {
    wins: 0,
    ties: 0,
    losses: 0,
    total: 0,
};

export const positions = [
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

export const combinations = [
    [0, 1, 2], // top row
    [3, 4, 5], // middle row
    [6, 7, 8], // bottom row
    [0, 3, 6], // left column
    [1, 4, 7], // center column
    [2, 5, 8], // right column
    [0, 4, 8], // top left to bottom right
    [2, 4, 6], // top right to bottom left
];


export function GamesReducer (state: Game, action: Action): Game {
    const leaderboard = state.leaderboard ? state.leaderboard : {};

    switch (action.type) {
        case "New Game":
            return {
                ...newGame,
                starts: state.starts,
                player: state.starts,
                names: state.names,
                remote: state.remote,
                leaderboard,
            };

        case "New Remote Game":
            return {
                ...newGame,
                starts: action.value as number,
                player: action.value as number,
                names: state.names,
                remote: state.remote,
                leaderboard,
            };

        case "Restart Game":
            return {
                ...newGame,
                leaderboard,
            };

        case "Set Remote":
            return {
                ...state,
                remote: action.value as string,
            };

        case "Remove Remote":
            return {
                ...state,
                remote: undefined,
            };

        case "Set Game":
            return action.value as Game;

        case "Set":
            const intermediate = {
                ...state,
                [state.turn === 'X' ? 'x' : 'o']: [...state[state.turn === 'X' ? 'x' : 'o'], action.value as number],
            }
            const { x, o, turn, names, player } = intermediate;

            combinations.some((combination, index) => {
                const match = combination.every(value => [...(turn === 'X' ? x : o)].includes(value));
    
                if (match) {
                    intermediate.line = combinations[index],
                    intermediate.winner = turn,
                    intermediate.starts = player,
                    intermediate.player = player,

                    names.map(name => leaderboard[name] = {
                        ...leaderboard[name],
                        [name === names[player] ? 'wins' : 'losses']: leaderboard[name][name === names[player]  ? 'wins' : 'losses'] + 1,
                        total: leaderboard[name].total + 1,
                    });
                }
                
                else {
                    intermediate.player = player === 0 ? 1 : 0;
                    intermediate.turn = turn == 'X' ? 'O' : 'X';
                }
    
                return match;
            });

            if (!(intermediate.winner) && x.length + o.length >= positions.length) {
                intermediate.tie = true;
                intermediate.names.map(name => leaderboard[name] = {
                    ...leaderboard[name],
                    ties: leaderboard[name].ties + 1,
                    total: leaderboard[name].total + 1,
                });
                intermediate.starts = player === 0 ? 1 : 0;
            }

            return {
                ...intermediate,
            };

        case "Set Names":
            (action.value as string[]).map(name => leaderboard[name] = { ...newPlayer });

            return {
                ...state,
                names: action.value as string[],
                starts: 0,
                player: 0,
                leaderboard,
            };

        default:
            return state;
    }
 };

const GameContext = createContext(null);

export default function GameProvider({ children }: { children?: React.ReactNode }) {
    const [state, dispatch] = useReducer(GamesReducer, newGame);
    const value: { state: Game, dispatch: Dispatch<Action> } = useMemo(() => ({ state, dispatch }), [state, dispatch]);

     useEffect(() => {
        if (!JSON.parse(localStorage.getItem("game"))) { 
            return;
        }

        dispatch({ 
            type: "Set Game",
            value: JSON.parse(localStorage.getItem("game")),
        });
     }, []);

     useEffect(() => {
        if (JSON.stringify(state) === JSON.stringify(newGame)) {
            return;
        }

        localStorage.setItem("game", JSON.stringify(state)); 
     }, [state]);

    return (
        <GameContext.Provider value={value}>
            {children}
        </GameContext.Provider>
    );
}

export function useGameContext() {
    return useContext(GameContext);
}
