import React from 'react';

export default function Area ({ position, onClick, onKeyDown, win, reference, children }: { position: string, win?: boolean, onKeyDown?: React.KeyboardEventHandler, onClick?: React.MouseEventHandler, reference: React.Ref<HTMLDivElement>, children?: React.ReactNode }): JSX.Element {
    return (
        <div ref={reference} tabIndex={0} className={`area${position.split(' ').map(place => ` -${place}`).join('')}${win ? ' -win' : ''}`} onClick={onClick} onKeyDown={onKeyDown}>   
            {children}
        </div>
    );
}
