import { React, useState, useEffect } from 'react';
import data from './data';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

// Utilize the URL to find the specific player data
const getPlayerData = (chosenPlayer, data) => {
	for (const player of data) {
		if (chosenPlayer === player[2]) {
			return player;
		}
	}
};

function App() {
	const [player1, setPlayer1] = useState(null);
	const [season1, setSeason1] = useState('');
	const [seasonType1, setSeasonType1] = useState('');
	const [playerName1, setPlayerName1] = useState('');

	const [player2, setPlayer2] = useState(null);
	const [season2, setSeason2] = useState('');
	const [seasonType2, setSeasonType2] = useState('');
	const [playerName2, setPlayerName2] = useState('');

	const fetchData = async (year, type, player, setPlayer) => {
		try {
			const url = `https://stats.nba.com/stats/leagueLeaders?LeagueID=00&PerMode=Totals&Scope=S&Season=${year}&SeasonType=${type}&StatCategory=PTS`;
			const response = await fetch(url);
			const json = await response.json();
			const rData = json.resultSet.rowSet;
			setPlayer(getPlayerData(player, rData));
		} catch (error) {
			console.log(error);
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (e.target[6].value === 'player1') {
			const year = season1;
			const type =
				seasonType1.toLowerCase() === 'r' ? 'Regular%20Season' : 'Playoffs';
			const player = playerName1;
			fetchData(year, type, player, setPlayer1);
			return;
		} else {
			const year = season2;
			const type =
				seasonType2.toLowerCase() === 'r' ? 'Regular%20Season' : 'Playoffs';
			const player = playerName2;
			fetchData(year, type, player, setPlayer2);
			return;
		}
	};

	return (
		<div className='App'>
			<div className='players-container'>
				<div>
					<h1>{player1 ? player1[2] : 'Player 1'}'s Stats</h1>
					<ul>
						{player1 &&
							player1.map((stat, index) => (
								<li key={index}>
									<strong>{data[index]}:</strong> : {stat}
								</li>
							))}
					</ul>
				</div>
				<div>
					<h1>{player2 ? player2[2] : 'Player 2'}'s Stats</h1>
					<ul>
						{player2 &&
							player2.map((stat, index) => (
								<li key={index}>
									<strong>{data[index]}:</strong> {stat}
								</li>
							))}
					</ul>
				</div>
			</div>
			{!player1 && (
				<form onSubmit={handleSubmit}>
					<TextField
						label='Season (ex: 2022-23)'
						onChange={(e) => setSeason1(e.target.value)}
					/>
					<br />
					<br />
					<TextField
						label='Playoff (p) / Regular (r)'
						onChange={(e) => setSeasonType1(e.target.value)}
					/>
					<br />
					<br />
					<TextField
						label="Player 1's name"
						onChange={(e) => setPlayerName1(e.target.value)}
					/>
					<br />
					<input type='hidden' value='player1' />
					<Button type='submit' variant='contained'>
						Submit
					</Button>
				</form>
			)}
			{!player2 && (
				<form onSubmit={handleSubmit}>
					<br />
					<br />
					<TextField
						label='Season (ex: 2022-23)'
						onChange={(e) => setSeason2(e.target.value)}
					/>
					<br />
					<br />
					<TextField
						label='Playoff (p) / Regular (r)'
						onChange={(e) => setSeasonType2(e.target.value)}
					/>
					<br />
					<br />
					<TextField
						label="Player 2's name"
						onChange={(e) => setPlayerName2(e.target.value)}
					/>
					<br />
					<input type='hidden' value='player2' />
					<Button type='submit' variant='contained'>
						Submit
					</Button>
				</form>
			)}
		</div>
	);
}

export default App;
