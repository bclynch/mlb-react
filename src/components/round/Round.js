import React from 'react';
import './Round.scss';
import Game from '../game/Game';

export default function Round(props) {
    return (
        <div>
            <div className="roundHeader">
                <img src={`/teams/${props.data.games[props.data.games.length - 1].teams.away.team.teamName}.svg`} />
                <div className="headerCenterWrapper">
                    <h4>{props.data.games[props.data.games.length - 1].seriesDescription}</h4>
                    <div>{props.data.games[props.data.games.length - 1].seriesStatus.result}</div>
                </div>
                <img src={`/teams/${props.data.games[props.data.games.length - 1].teams.home.team.teamName}.svg`} />
            </div>
            <div className="roundGames">
                {generateGames(props.data.games)}
            </div>
        </div>
    )
};

function generateGames(games) {
    return games.map((game, i) => (<Game data={game} key={i}></Game>));
}