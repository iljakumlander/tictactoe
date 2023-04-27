# Knots and crosses
Yet another attempt to a game with many names but the same goal

## Goals
1. Present as a ReactJS application that will have an initial page to input players' names and a button to start the game
2. Present the game board UI with some simple, CSS/sass layout (X - red, O - blue)
3. Store current positions in the local state, making use of useState()
4. Store history of all games using global state useContext()
5. Use React Router to create navigation from game board to scoreboard and vice-versa
6. Checks history when playing a new game. If the same players have played before, defines the previous winner as Player 1 (as convention X - should start the game) for the next round.
7. Provides README.md file with the steps to run the app (present document).

## Disclaimer
Some combination of both research on theory of the game and general technical documentation lookup for setting up an environment was done or was ongoing during the development of this application

## Install
```sh
npm install
```

## Run
```sh
npm run start
```

## Build
```sh
npm run build
```

### Deploy path `(optional)`
Create `.env` file and define deploy path for an environment in case you deploy in server's subdirectory
```sh
DEPLOY=TRUE
INSTALL_PATH=/tictactoe
```

## Version Log
### 0.0.4
Scoreboard and visal tweaking

### 0.0.3
Game input and styling tweaks, installation instructions

### 0.0.2
Prompting names, keeping scores and game logic set

### 0.0.1
Game components set, winning conditions installed, data persist configured


### 0.0.0
Development environment with deployable build set on Next 13 and React 18
