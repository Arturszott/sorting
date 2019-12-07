import React, { useState, useEffect } from 'react';
import './App.css';

// steps
// Show array

// run algorithm on click
// add operations to queue
// play queue

// operations: Compare, Swap,

const isNextBigger = (array, i) => array[i + 1] > array[i];
const isNextSmaller = (array, i) => {
	const current = array[i];
	const next = array[i + 1];

	console.log(current, next, next < current);
	return next < current;
};

const executeSwap = (pair, array) => ([ array[pair[0]], array[pair[1]] ] = [ array[pair[1]], array[pair[0]] ]);

function sortBubble(array) {
	const localArray = [ ...array ];
	const operations = [];
	let shouldSort = true;

	while (shouldSort) {
		let iterationsSwapsCount = 0;

		for (let i = 0; i < localArray.length - 1; i++) {
			if (isNextSmaller(localArray, i)) {
				const swapPair = [ i, i + 1 ];

				iterationsSwapsCount++;
				operations.push(swapPair);
				executeSwap(swapPair, localArray);
			}
		}

		shouldSort = Boolean(iterationsSwapsCount);
	}

	return operations;
}

const initialArray = [ 2, 4, 3, 5, 1 ];
const operations = sortBubble(initialArray);
const generateSteps = (ops) => {
	const localCopy = [ ...initialArray ];

	return [
		initialArray,
		...ops.map((pair) => {
			executeSwap(pair, localCopy);
			return [ ...localCopy ];
		})
	];
};
const steps = generateSteps(operations);

function App() {
	const [ array, setArray ] = useState(initialArray);

	useEffect(() => {
		for (let i = 0; i < steps.length; i++) {
			window.setTimeout(() => {
				setArray(steps[i]);
			}, 500 * i);
		}
	}, []);

	return (
		<div className="App">
			<header className="App-header">
				<h1>{array}</h1>
			</header>
		</div>
	);
}

export default App;
