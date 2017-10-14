import React from 'react'
import socket from '../model/socket'

import Team from './Team'

class Leaderboard extends React.Component {

    constructor (props) {
        super(props);
        this.state = {
            teams: [
                { username: 'klug', name: 'Klug Team', score: 2000 },
                { username: 'pug', name: 'Pug Team', score: 1000 },
                { username: 'bhamn', name: 'Ngino Team', score: 800 },
            ]
        };
        socket.on('team score update', info => {
            const teams = this.state.teams;
            for (let team of teams) if (team.username === info.username) team.score = info.score;
            this.setState({ teams })
        })
    }

    get teamsList () {
        const teams = this.state.teams;
        const sortedTeams = ([].concat(teams)).sort((team1, team2) => team2.score - team1.score);
        const items = [];
        for (let i = 0; i < teams.length; i++) {
            const team = teams[i];
            items.push(
                <Team key={team.username}
                      rank={sortedTeams.indexOf(team)}
                      name={team.name}
                      score={team.score}
                      highScore={sortedTeams[0].score} />
            );
        }
        return items;
    }

    render() {
        return (
            <aside>
                <header>
                    <img src="./assets/images/leaderboard.png" alt="leaderboard icon" />
                </header>
                <ol className="ranks">{this.teamsList}</ol>
            </aside>
        )
    }
}

export default Leaderboard