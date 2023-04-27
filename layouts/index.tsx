import React from 'react';
import Head from 'next/head';

import { useGameContext } from '../context/game';


const PATH = process.env.INSTALL_PATH || '';

export default function Layout ({ title, children }: { title: string, children?: React.ReactNode }): JSX.Element {
    const { state } = useGameContext();
    const { names, player, turn, starts } = state;
    const name = names && names[player] || 'Player';
    const initial = names && names[starts] || 'Player';
    return (
        <>
            <Head>
                <meta charSet="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <title>{title}</title>
                <link rel="shortcut icon" href={`${PATH}/favicon.ico`} />
            </Head>
            
            <header>
                Turn: {name} ({turn})
            </header>

            {children}
        </>
    );
}
