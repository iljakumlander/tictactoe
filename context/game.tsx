import React, { createContext, useContext, useMemo, useEffect, useReducer, Dispatch } from "react";

interface Player {
    total: number;
    played: Game[];
}

interface Game {
    name?: string;
    x: number[];
    o: number[];
    turn?: string;
    winner?: string;
    line?: number[];
    leaderboard?: string[];
};

interface Some {
    number?: number;
}

interface Action {
    type: string;
    value?: number | string | number[] | Game;
}

export const newGame: Game = {
    x: [],
    o: [],
    turn: 'X',
};

export function GamesReducer (state: Game, action: Action): Game {
    switch (action.type) {
        case "New Game":
            return newGame;

        case "Set Game":
            return action.value as Game;

       case "Set X":
            return {
                ...state,
                x: [...state.x, action.value as number],
            };

        case "Set O":
            return {
                ...state,
                o: [...state.o, action.value as number],
            };

        case "Next Turn":
            return {
                ...state,
                turn: state.turn === 'X' ? 'O' : 'X',
            };

        case "Set Winner":
            return {
                ...state,
                winner: action.value as string,
            };
        
        case "Set Line":
            return {
                ...state,
                line: action.value as number[],
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
