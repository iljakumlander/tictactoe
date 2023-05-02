import React, { createContext, useContext, useMemo, useReducer, Dispatch } from "react";

export enum Announce {
    New,
}

export interface Action {
    type: Announce;
    value?: JSX.Element;
}

export function NotificationsReducer (state: JSX.Element[], action: Action): JSX.Element[] {
    switch (action.type) {
        case Announce.New:
            return [
                ...state,
                action.value,
            ];

        default:
            return state;
    }
 };

const NotificationContext = createContext(null);

export default function NotificationProvider ({ children }: { children?: React.ReactNode }) {
    const [notifications, announcer] = useReducer(NotificationsReducer, []);
    const value: { notifications: JSX.Element[], announcer: Dispatch<Action> } = useMemo(() => ({ notifications, announcer }), [notifications, announcer]);

    return (
        <NotificationContext.Provider value={value}>
            {children}
        </NotificationContext.Provider>
    );
}

export function useNotificationContext () {
    return useContext(NotificationContext);
}
