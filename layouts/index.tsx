import React from 'react';
import Head from 'next/head';

const PATH = process.env.INSTALL_PATH || '';

export default function Layout ({ title, children }: { title: string, children?: React.ReactNode }): JSX.Element {
    return (
        <>
            <Head>
                <meta charSet="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <title>{title}</title>
                <link rel="shortcut icon" href={`${PATH}/favicon.ico`} />
            </Head>

            {children}
        </>
    );
}
