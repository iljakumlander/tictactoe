import React from 'react';

import GameProvider from '../context/game';

import '../styles/index.scss';

export default function Application({ Component, pageProps }): JSX.Element {
  return (
    <GameProvider>
        <Component {...pageProps} />
    </GameProvider>
  );
}
