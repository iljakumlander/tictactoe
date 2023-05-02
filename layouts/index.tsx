import React from 'react';
import Head from 'next/head';

import { config } from '../config';
import { useNotificationContext } from '../context/notification';
import { useGameContext } from '../context/game';

export default function Layout ({ title, children }: { title: string, children?: React.ReactNode }): JSX.Element {
    const { notifications } = useNotificationContext();
    const { state } = useGameContext();
    const { status } = state;
    const { path } = config;

    return (
        <>
            <Head>
                <meta charSet="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <title>{title}</title>
                <link rel="shortcut icon" href={`${path}/favicon.ico`} />
            </Head>

            <header>
                {notifications.map((notification: JSX.Element, index: number) => <React.Fragment key={index}>{notification}</React.Fragment>)}
            </header>
            
            <nav>
                <ul>
                    <li>
                        <a href={path || '/'}>Menu</a>
                    </li>
                    <li>
                        <a href={path && path + '/scoreboard/' || '/scoreboard/'}>Scores</a>
                    </li>
                </ul>
            </nav>

            <main>
                {children}
            </main>

            <footer>
                {status}
            </footer>
        </>
    );
}
