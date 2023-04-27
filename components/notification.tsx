import React, { useState, useEffect } from 'react';

const delay = (ms: number): Promise<NodeJS.Timeout> => new Promise(resolve => setTimeout(resolve, ms));

export default function Notification ({ message, expire, reference, children }: { message?: string, expire?: number, reference?: React.Ref<HTMLDivElement>, children?: React.ReactNode }): JSX.Element {
    const [exists, setExists] = useState(true);
    const [visible, setVisible] = useState(null);

    useEffect (() => {
        show();
    }, []);

    useEffect(() => {
        if (expire && Date.now() >= expire + 100) {
            return;
        }

        show();
    }, [expire]);

    async function show () {
        setExists(true);
        await delay(100);

        setVisible(true);

        await delay(3000);

        setVisible(false);

        await delay(500);

        setExists(false);
    }

    return exists ? (
        <div ref={reference} className={`notification${visible === null ? ` -ready` : visible ? ` -set` : ` -gone`}`}>
            {message}
            {children}
        </div>
    ) : null;
}
