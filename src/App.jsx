import { React, useState, useEffect } from 'react';
import data from './data';

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
	const [player2, setPlayer2] = useState(null);

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
		const year = e.target[0].value;
		const type =
			e.target[1].value.toLowerCase() === 'r' ? 'Regular%20Season' : 'Playoffs';
		const player = e.target[2].value;
		const whichPlayer =
			e.target[3].value === 'player1' ? setPlayer1 : setPlayer2;
		fetchData(year, type, player, whichPlayer);
	};
	console.log(data);
	return (
		<div className='App'>
			<div className='players-container'>
				<div>
					<h1>{player1 ? player1[2] : 'Player 1'}'s Stats</h1>
					<ul>
						{player1 &&
							player1.map((stat, index) => (
								<li key={index}>
									{data[index]} : {stat}
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
									{data[index]} : {stat}
								</li>
							))}
					</ul>
				</div>
			</div>
			{!player1 && (
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
						placeholder="Input the first player's stats you want to see: "
					/>
					<br />
					<input type='hidden' value='player1' />
					<button type='submit'>Submit</button>
				</form>
			)}
			{!player2 && (
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
						placeholder="Input the first player's stats you want to see: "
					/>
					<br />
					<input type='hidden' value='player2' />
					<button type='submit'>Submit</button>
				</form>
			)}
		</div>
	);
}

export default App;
