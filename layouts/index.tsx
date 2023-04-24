import React from 'react';
import Head from 'next/head';

const PATH = process.env.INSTALL_PATH || '';

export default function Layout ({ title, children }: { title: string, children?: React.ReactNode }): JSX.Element {
    return (
        <>
            <Head>
                <title>{title}</title>
                <link rel="shortcut icon" href={`${PATH}/favicon.ico`} />
            </Head>

            <header>
                <h1>{title}</h1>
            </header>

            <main>
                {children}
            </main>

            <footer>
                <p>version 0.0.0</p>
            </footer>
        </>
    );
}
