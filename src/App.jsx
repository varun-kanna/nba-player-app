import { React, useState } from 'react';
import data from './data';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

// Utilize the URL to find the specific player data
const getPlayerData = (chosenPlayer, data) => {
	for (const player of data) {
		if (chosenPlayer.toLowerCase() === player[2].toLowerCase()) {
			return player;
		}
	}
};

function App() {
	const [player1, setPlayer1] = useState(null);
	const [season1, setSeason1] = useState('');
	const [seasonType1, setSeasonType1] = useState('');
	const [playerName1, setPlayerName1] = useState('');
	const [show1, setShow1] = useState(false);

	const [player2, setPlayer2] = useState(null);
	const [season2, setSeason2] = useState('');
	const [seasonType2, setSeasonType2] = useState('');
	const [playerName2, setPlayerName2] = useState('');
	const [mode, setMode] = useState('');
	const [show2, setShow2] = useState(false);

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

	const comparePlayers = (mode) => {
		if (mode === 'IPE') {
			// 	Which player had the higher individual player efficiency

			const player1_eff =
				(player1[24] +
					player1[18] +
					player1[19] +
					player1[20] +
					player1[21] -
					(player1[8] - player1[7]) -
					(player1[14] - player1[13]) -
					player1[22]) /
				player1[5];

			const player2_eff =
				(player2[24] +
					player2[18] +
					player2[19] +
					player2[20] +
					player2[21] -
					(player2[8] - player2[7]) -
					(player2[14] - player2[13]) -
					player2[22]) /
				player2[5];

			if (player1_eff > player2_eff) {
				return `${
					player1[2]
				} in ${season1} had a higher ${mode} with ${player1_eff.toFixed(
					3
				)} than  ${player2[2]}, who had ${player2_eff.toFixed(
					3
				)} in ${season2}`;
			} else {
				return `${
					player2[2]
				} in ${season2} had a higher ${mode} with ${player2_eff.toFixed(
					3
				)} than  ${player1[2]}, who had ${player1_eff.toFixed(
					3
				)} in ${season1}`;
			}
		} else if (mode === 'TSP') {
			// Which player had the higher true shooting percentage

			const player1_ts =
				(player1[24] / (2 * (player1[8] + 0.44 * player1[14]))) * 100;
			const player2_ts =
				(player2[24] / (2 * (player2[8] + 0.44 * player2[14]))) * 100;

			if (player1_ts > player2_ts) {
				return `${
					player1[2]
				} in ${season1} had a higher ${mode} with ${player1_ts.toFixed(
					3
				)} than  ${player2[2]}, who had ${player2_ts.toFixed(3)} in ${season2}`;
			} else {
				return `${
					player2[2]
				} in ${season2} had a higher ${mode} with ${player2_ts.toFixed(
					3
				)} than  ${player1[2]}, who had ${player1_ts.toFixed(3)} in ${season1}`;
			}
		} else if (mode === 'EFGP') {
			// Wrints which player had the higher field goal percentage

			const player1_efg = ((player1[7] + 0.5 * player1[10]) / player1[8]) * 100;
			const player2_efg = ((player2[7] + 0.5 * player2[10]) / player2[8]) * 100;

			if (player1_efg > player2_efg) {
				return `${
					player1[2]
				} in ${season1} had a higher ${mode} with ${player1_efg.toFixed(
					3
				)} than  ${player2[2]}, who had ${player2_efg.toFixed(
					3
				)} in ${season2}`;
			} else {
				return `${
					player2[2]
				} in ${season2} had a higher ${mode} with ${player2_efg.toFixed(
					3
				)} than  ${player1[2]}, who had ${player1_efg.toFixed(
					3
				)} in ${season1}`;
			}
		} else {
			return '';
		}
	};

	return (
		<div className='App'>
			<div className='players-container'>
				<div>
					<h1>
						{player1 ? player1[2] : 'Player 1'}'s Stats
						<IconButton
							aria-label='delete'
							size='small'
							onClick={() => setShow1(!show1)}>
							<ArrowDropDownIcon fontSize='inherit' />
						</IconButton>
					</h1>

					<ul>
						{show1 &&
							player1 &&
							player1.map((stat, index) => (
								<li key={index}>
									<strong>{data[index]}:</strong> : {stat}
								</li>
							))}
					</ul>
				</div>
				<div>
					<h1>
						{player2 ? player2[2] : 'Player 2'}'s Stats
						<IconButton
							aria-label='delete'
							size='small'
							onClick={() => setShow2(!show2)}>
							<ArrowDropDownIcon fontSize='inherit' />
						</IconButton>
					</h1>
					<ul>
						{show2 &&
							player2 &&
							player2.map((stat, index) => (
								<li key={index}>
									<strong>{data[index]}:</strong> {stat}
								</li>
							))}
					</ul>
				</div>
			</div>
			<div>
				{player1 && player2 && (
					<>
						<h1 className='players-container'>Player Comparison</h1>
						<div className='players-container'>
							<TextField
								label='Compare IPE, TSP, or EFGP'
								onChange={(e) => setMode(e.target.value)}
							/>
						</div>
					</>
				)}
				{mode && <h2 className='players-container'>{comparePlayers(mode)}</h2>}
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
