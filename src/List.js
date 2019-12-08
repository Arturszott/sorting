import React from 'react';
import uniqid from 'uniqid';

import { executeSwap } from './utils';
import { Swap, Compare } from './sorting/operations';

class Element {
	constructor(value, position) {
		this.value = value;
		this.position = position;
		this.id = uniqid();
	}
}

class List {
	constructor(values) {
		this.array = values;
		this.elements = values.map((value, i) => new Element(value, i));
		this.highlighted = [];
		this.compared = [];
	}

	execute(operation) {
		if (operation instanceof Swap) {
			this.swap(operation);
		}

		if (operation instanceof Compare) {
			this.compare(operation);
		}
	}

	clearHighlight() {
		this.highlighted.forEach((element) => (element.highlighted = false));
	}

	clearComparison() {
		this.compared.forEach((element) => (element.compared = false));
	}

	compare(operation) {
		this.clearComparison();

		const comparedElements = operation.pair.map((index) =>
			this.elements.find((element) => element.position === index)
		);

		console.log(comparedElements);

		this.compared = comparedElements;
		this.compared.forEach((element) => (element.compared = true));
	}

	swap(operation) {
		executeSwap(operation.pair, this.array);

		this.swapPositions(operation.pair);
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
		this.clearComparison();
	}

	renderElements() {
		return (
			<ul style={{ position: 'relative' }}>
				{this.elements.map((element) => (
					<li
						key={element.id}
						style={{
							color: element.highlighted ? 'red' : '',
							borderBottom: element.compared ? '3px solid #ccc' : '3px solid transparent',
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

export default List;
