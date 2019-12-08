import React, { useState, useEffect } from 'react';
import './App.css';

import List from './List';
import bubbleSort from './sorting/bubble';

const initialArray = [ 2, 4, 3, 5, 1 ];
const operations = bubbleSort(initialArray);

const list = new List(initialArray);

function App() {
	const [ stepIndex, setStep ] = useState(0);

	useEffect(() => {
		for (let i = 0; i < operations.length; i++) {
			window.setTimeout(() => {
				list.execute(operations[i]);
				setStep(i + 1);
			}, 500 * (i + 1));
		}

		window.setTimeout(() => {
			list.finish();
			setStep(stepIndex + 1);
		}, operations.length * 500);
	}, []);

	return (
		<div className="App">
			<header className="App-header">
				<h1>{list.renderElements()}</h1>
			</header>
		</div>
	);
}

export default App;
