import React from 'react';
import './Game.scss';

export default function Game(props) {
    const wrapLink = `https://www.mlb.com/gameday/${props.data.gamePk}/final/wrap`;
    const videoLink = `https://www.mlb.com/gameday/${props.data.gamePk}/final/video`;
    const homeTeamLink = `https://www.mlb.com/${props.data.teams.home.team.teamName.split(' ').join('').toLowerCase()}`;
    const awayTeamLink = `https://www.mlb.com/${props.data.teams.away.team.teamName.split(' ').join('').toLowerCase()}`;

    return (
        <div className="rowWrapper">
            <div className="gameWrapper">
                <div>Gm {props.data.seriesStatus.gameNumber}</div>
                <div>{props.data.gameDate}</div>
            </div>
            <div className="scoreWrapper">
                <a target="_blank" rel="noopener noreferrer" href={awayTeamLink}>
                    <img src={`/teams/${props.data.teams.away.team.teamName}.svg`} />
                    <div>{props.data.teams.away.team.teamName}</div>
                    <div>{props.data.teams.away.score}</div>
                </a>
                <div>@</div>
                <a target="_blank" rel="noopener noreferrer" href={homeTeamLink}>
                    <img src={`/teams/${props.data.teams.home.team.teamName}.svg`} />
                    <div>{props.data.teams.home.team.teamName}</div>
                    <div>{props.data.teams.home.score}</div>
                </a>
            </div>
            <div className="statusWrapper">
                <div>{props.data.status.statusCode}</div>
            </div>
            <div className="broadcastWrapper">
                <div>{props.data.broadcasts[1].name}</div>
            </div>
            <div className="decisionsWrapper">
                <div>W: </div>
                <div>{props.data.decisions.winner.initLastName}</div>
                <div>L: </div>
                <div>{props.data.decisions.loser.initLastName}</div>
                {checkForSave(props.data.decisions)}
            </div>
            <div className="linksWrapper">
                <a target="_blank" rel="noopener noreferrer" href={wrapLink}>Wrap</a>
                <a target="_blank" rel="noopener noreferrer" href={videoLink}>Video</a>
            </div>
        </div>
    )
}

function checkForSave(decisions) {
    if (decisions.save) {
        return (
            <React.Fragment>
                <div>SV: </div>
                <div>{decisions.save.initLastName}</div>
            </React.Fragment>
        )
    }
    return null;
}