import { ManagerOptions, SocketOptions } from 'socket.io-client';

export const config: {
    path: string;
    server: {
        host: string;
        opts: Partial<ManagerOptions & SocketOptions>;
    };
} = {
    path: process.env.NEXT_PUBLIC_INSTALL_PATH || '',
    server: {
        host: process.env.NEXT_PUBLIC_REMOTE,
        opts: process.env.NODE_ENV === 'production' ? { secure: true, transports: ['websocket'] } : {},
    }
};
