import React from 'react';
import './Date.scss';
import Game from '../game/Game';

export default function Date(props) {
    return (
        <div>
            <div className="dateHeader">{props.data[0].gameDate.split('T')[0]}</div>
            <div className="dateGames">{generateGames(props.data)}</div>
        </div>
    )
}

function generateGames(games) {
    return games.map((game, i) => (<Game data={game} key={i}></Game>));
}