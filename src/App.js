import React, { useState, useEffect } from 'react';
import uniqid from 'uniqid';
import './App.css';

const executeSwap = (pair, array) => ([ array[pair[0]], array[pair[1]] ] = [ array[pair[1]], array[pair[0]] ]);

class List {
	constructor(values) {
		this.array = values;
		this.elements = values.map((value, i) => new Element(value, i));
		this.highlighted = [];
	}

	swap(pair) {
		executeSwap(pair, this.array);

		this.swapPositions(pair);
	}

	clearHighlight() {
		this.highlighted.forEach((element) => (element.highlighted = false));
	}

	swapPositions(pair) {
		this.clearHighlight();

		const leftElement = this.elements.find((element) => element.position === pair[0]);
		const rightElement = this.elements.find((element) => element.position === pair[1]);

		this.highlighted = [ leftElement, rightElement ];

		this.highlighted.forEach((element) => (element.highlighted = true));

		[ leftElement.position, rightElement.position ] = [ rightElement.position, leftElement.position ];
	}

	finish() {
		this.clearHighlight();
	}

	renderElements() {
		return (
			<ul style={{ position: 'relative' }}>
				{this.elements.map((element) => (
					<li
						key={element.id}
						style={{
							color: element.highlighted ? 'red' : '',
							transition: 'all 0.2s',
							position: 'absolute',
							listStyle: 'none',
							left: element.position * 40,
							top: 0
						}}
					>
						{element.value}
					</li>
				))}
			</ul>
		);
	}
}

class Element {
	constructor(value, position) {
		this.value = value;
		this.position = position;
		this.id = uniqid();
	}
}

const isNextSmaller = (array, i) => array[i + 1] < array[i];

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

const list = new List(initialArray);

function App() {
	const [ stepIndex, setStep ] = useState(0);

	useEffect(() => {
		for (let i = 0; i < operations.length; i++) {
			window.setTimeout(() => {
				list.swap(operations[i]);
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
