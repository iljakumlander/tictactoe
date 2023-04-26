import React from 'react';

export default function Board ({ turn, winner, children }: { turn: string, winner?: string, children?: React.ReactNode }): JSX.Element {
    return (
        <div className={`board${turn && ` -${turn}`}${(winner ? ` -winner` : ``)}`}>
            {children}
        </div>
    );
}
