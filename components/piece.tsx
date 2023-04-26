import React from 'react';

export default function Piece ({ occupied }: { occupied?: string}): JSX.Element {
    return occupied && <div className={`piece -${occupied}`}>{occupied}</div> || null;
}
