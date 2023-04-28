import React, { useState, useEffect } from 'react';

import { useGameContext, Player } from '../context/game';

import Layout from '../layouts';


export default function Scoreboard (): JSX.Element {
    const { state } = useGameContext();
    const { leaderboard } = state;
    
    return (
        <Layout title="Scoreboard">
            <table className="leaderboard">
                <thead>
                    <tr>
                        <th>Player</th>
                        <th>Wins</th>
                        <th>Ties</th>
                        <th>Losses</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                    {leaderboard && Object.entries(leaderboard).map(([name, player]: [string, Player], index) => (
                        <tr key={index}>
                            <td>{name === '' ? (<em>Computer</em>) : name}</td>
                            <td>{player.wins}</td>
                            <td>{player.ties}</td>
                            <td>{player.losses}</td>
                            <td>{player.total}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </Layout>
    )
}
