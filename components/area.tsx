import React from 'react';

export default function Area ({ position, onClick, win, children }: { position: string, win?: boolean, onClick?: (event: React.MouseEvent) => void, children?: React.ReactNode }): JSX.Element {
    return (
        <div className={`area${position.split(' ').map(place => ` -${place}`).join('')}${win && ' -win'}`} onClick={onClick}>   
            {children}
        </div>
    );
}
