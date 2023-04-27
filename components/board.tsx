import React from 'react';

export default function Board ({ turn, winner, input, reference, focus, blur, children }: { turn: string, winner?: string, input?: string, reference?: React.Ref<HTMLDivElement>, focus?: React.FocusEventHandler, blur?: React.FocusEventHandler, children?: React.ReactNode }): JSX.Element {
    return (
        <div ref={reference} className={`board${turn && ` -${turn}`}${(winner ? ` -winner` : ``)}${(input ? ` -${input}` : ``)}`} onFocus={focus} onBlur={blur}>
            {children}
        </div>
    );
}
