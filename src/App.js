import React, { useState, useEffect } from 'react';
import './App.css';

import List from './List';
import bubbleSort from './sorting/bubble';

function SelectionPage() {
	const [ state, setState ] = useState({});
	const [ values, changeValues ] = useState([ 2, 4, 3, 5, 6, 1 ].join(' '));
	const [ time, setTime ] = useState(400);

	const onBubbleClick = () => {
		const numbers = values.trim().split(' ').map(Number);

		setState({
			...state,
			operations: bubbleSort(numbers),
			list: new List(numbers),
			name: 'Bubble sort'
		});
	};

	const picker = (
		<React.Fragment>
			<input type="text" value={values} onChange={(e) => changeValues(e.target.value)} />
			<input type="number" step="50" value={time} onChange={(e) => setTime(Number(e.target.value))} />

			<button onClick={onBubbleClick}>Bubble sort</button>
		</React.Fragment>
	);

	return state.operations ? (
		<ReplayPage operations={state.operations} list={state.list} name={state.name} time={time} />
	) : (
		picker
	);
}

function ReplayPage({ operations, list, name, time }) {
	const [ stepIndex, setStep ] = useState(0);

	useEffect(
		() => {
			for (let i = 0; i < operations.length; i++) {
				window.setTimeout(() => {
					list.execute(operations[i]);
					setStep(i + 1);
				}, time * (i + 1));
			}

			window.setTimeout(() => {
				list.finish();
				setStep(stepIndex + 1);
			}, operations.length * time);
		},
		[ operations, list ]
	);

	return (
		<React.Fragment>
			<h1>{name}</h1>
			<h2>{list.renderElements()}</h2>
		</React.Fragment>
	);
}

function App() {
	return (
		<div className="App">
			<header className="App-header">
				<SelectionPage />
			</header>
		</div>
	);
}

export default App;
