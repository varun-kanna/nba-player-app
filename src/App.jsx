import { React, useState, useEffect } from 'react';

const data = [
	'PLAYER_ID',
	'RANK',
	'PLAYER',
	'TEAM_ID',
	'TEAM',
	'GP',
	'MIN',
	'FGM',
	'FGA',
	'FG_PCT',
	'FG3M',
	'FG3A',
	'FG3_PCT',
	'FTM',
	'FTA',
	'FT_PCT',
	'OREB',
	'DREB',
	'REB',
	'AST',
	'STL',
	'BLK',
	'TOV',
	'PF',
	'PTS',
	'EFF',
	'AST_TOV',
	'STL_TOV',
];

// Utilize the URL to find the specific player data
const getPlayerData = (data) => {
	for (const player of data) {
		console.log(player);
	}
};

function App() {
	const year = '2020-21';
	const type = 'Regular Season';
	const url = `https://stats.nba.com/stats/leagueLeaders?LeagueID=00&PerMode=Totals&Scope=S&Season=${year}&SeasonType=${type}&StatCategory=PTS`;
	const [data, setData] = useState(null);
	const [player1, setPlayer1] = useState(null);
	const [player2, setPlayer2] = useState(null);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch(url);

				const json = await response.json();
				const data = json.resultSet.rowSet;
				console.log(json.resultSet);
				setData(data);
			} catch (error) {
				console.log(error);
			}
		};

		// fetchData();
	}, [url]);

	// getPlayerData(data);

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log(e.target[0].value);
		console.log(e.target[1].value);
		console.log(e.target[2].value);
	};

	return (
		<div className='App'>
			<ul>{data && data.map((player) => <li key={player[0]}>{player}</li>)}</ul>
			<form onSubmit={handleSubmit}>
				<input type='text' placeholder="Enter NBA Season (ex: '2022-23'): " />
				<br />
				<input
					type='text'
					placeholder='Do you want to see Playoff Stats(p) or Regular Season stats (r): '
				/>
				<br />
				<input
					type='text'
					placeholder="Input the player's stats you want to see: "
				/>
				<br />
				<button type='submit'>Submit</button>
			</form>
		</div>
	);
}

export default App;
