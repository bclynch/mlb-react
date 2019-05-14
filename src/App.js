import React, { useState, useEffect } from 'react';
import './App.scss';

import axios from 'axios';
import PillButton from './components/pillButton/PillButton';
import Round from './components/round/Round';
import Date from './components/date/Date';

// example with a class
// class App extends React.Component {
// 	constructor(props) {
// 		super(props);

// 		this.state = { data: null, type: 'By Round', rawData: null };
// 		this.scheduleTypeHandler = this.scheduleTypeHandler.bind(this);
// 	}

// 	componentWillMount() {
// 		axios.get('http://statsapi.mlb.com/api/v1/schedule/postseason/series?sportId=1&season=2018&hydrate=team,broadcasts(all),seriesStatus(useOverride=true),decisions,person,probablePitcher,linescore(matchup)').then(
// 			(data) => {
// 				console.log(data.data.series);
// 				this.setState({ data: this.processData(data.data.series, this.state.type), rawData: data.data.series });
// 			}
// 		)
// 	}

// 	processData(data, type) {
// 		console.log(type);
// 		if (type === 'By Round') return data;

// 		// if it is sorted by date
// 		// loop over each game in each series
// 		let dateObj = {};
// 		data.forEach((series) => {
// 			series.games.forEach((game) => {
// 				const date = game.gameDate.split('T')[0];
// 				// add date if it doesn't exist
// 				if (!dateObj[date]) dateObj[date] = [];

// 				// push into date arr
// 				dateObj[date].push(game);
// 			});
// 		});
// 		return dateObj;
// 	}

// 	scheduleTypeHandler(e) {
// 		this.setState({ data: this.processData(this.state.rawData, e.target.innerHTML), type: e.target.innerHTML });
// 	}

// 	generateRounds() {
// 		if (!this.state.data) return null;
			
// 		return Object.keys(this.state.data).map((key, i) => {
// 			return <Round key={i} data={this.state.data[key]}></Round>
// 		});
// 	}

// 	generateDates() {
// 		if (!this.state.data) return null;
			
// 		const arr = Object.keys(this.state.data).map((key, i) => (<Date key={i} data={this.state.data[key]}></Date>));

// 		return arr;

// 		// console.log(arr);
		
// 		// const abc = arr.sort((a, b) => {
// 		// 	const keyA = new Date(a.gameDate),
// 		// 		keyB = new Date(b.gameDate);
// 		// 	// Compare the 2 dates
// 		// 	if(keyA < keyB) return -1;
// 		// 	if(keyA > keyB) return 1;
// 		// 	return 0;
// 		// });

// 		// console.log(abc);

// 		// return abc;
// 	}

// 	render() {
// 		const buttonLabels = ['By Date', 'By Round'];

// 		return (
// 			<div className="App">
// 				<div className="titleWrapper">
// 					<div className="spacer"></div>
// 					<h3>Schedule</h3>
// 					<div className="spacer"></div>
// 				</div>
// 				<PillButton buttonData={buttonLabels} handler={this.scheduleTypeHandler}></PillButton>
// 				{this.state.type === 'By Round' ? this.generateRounds() : this.generateDates()}
// 			</div>
// 		);
// 	}
// }
  

// export default App;


// example with hooks
export default function App() {
	const [data, setData] = useState(null);
	const [type, setType] = useState('By Round');
	const [rawData, setRawData] = useState(null);
	const buttonLabels = ['By Date', 'By Round'];

	function scheduleTypeHandler(e) {
		setData(processData(rawData, e.target.innerHTML));
		setType(e.target.innerHTML);
	}

	// Similar to componentDidMount and componentDidUpdate:
	useEffect(() => {
		if (!rawData) {
			axios.get('http://statsapi.mlb.com/api/v1/schedule/postseason/series?sportId=1&season=2018&hydrate=team,broadcasts(all),seriesStatus(useOverride=true),decisions,person,probablePitcher,linescore(matchup)').then(
				(data) => {
					console.log(data.data.series);
					setData(processData(data.data.series, type));
					setRawData(data.data.series);
				}
			)
		}
	});

	return (
		<div className="App">
			<div className="titleWrapper">
				<div className="spacer"></div>
				<h3>Schedule</h3>
				<div className="spacer"></div>
			</div>
			<PillButton buttonData={buttonLabels} handler={scheduleTypeHandler}></PillButton>
			{type === 'By Round' ? generateRounds(data) : generateDates(data)}
		</div>
	);
}

function processData(data, type) {
	console.log(type);
	if (type === 'By Round') return data;

	// if it is sorted by date
	// loop over each game in each series
	let dateObj = {};
	data.forEach((series) => {
		series.games.forEach((game) => {
			const date = game.gameDate.split('T')[0];
			// add date if it doesn't exist
			if (!dateObj[date]) dateObj[date] = [];

			// push into date arr
			dateObj[date].push(game);
		});
	});
	return dateObj;
}

function generateRounds(data) {
	if (!data) return null;
		
	return Object.keys(data).map((key, i) => {
		return <Round key={i} data={data[key]}></Round>
	});
}

function generateDates(data) {
	if (!data) return null;
		
	const arr = Object.keys(data).map((key, i) => (<Date key={i} data={data[key]}></Date>));

	return arr;

	// console.log(arr);
	
	// const abc = arr.sort((a, b) => {
	// 	const keyA = new Date(a.gameDate),
	// 		keyB = new Date(b.gameDate);
	// 	// Compare the 2 dates
	// 	if(keyA < keyB) return -1;
	// 	if(keyA > keyB) return 1;
	// 	return 0;
	// });

	// console.log(abc);

	// return abc;
}