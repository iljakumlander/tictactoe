import React from 'react';

import GameProvider from '../context/game';
import NotificationProvider from '../context/notification';

import '../styles/index.scss';

export default function Application({ Component, pageProps }): JSX.Element {
  return (
    <NotificationProvider>
      <GameProvider>
          <Component {...pageProps} />
      </GameProvider>
    </NotificationProvider>
  );
}
