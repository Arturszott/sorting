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

	renderElement(element, i) {
		const width = 20;
		const padding = 10;

		const elementStyle = {
			color: element.highlighted ? 'red' : '',
			borderBottom: element.compared ? '3px solid #ccc' : '3px solid transparent',
			width: `${width}px`,
			transition: 'all 0.2s',
			listStyle: 'none',
			transform: `translateX(${(element.position - i) * (width + 2 * padding)}px)`,
			padding: `${padding}px`
		};

		return (
			<li key={element.id} style={elementStyle}>
				{element.value}
			</li>
		);
	}
	renderElements() {
		return <ul style={{ display: 'flex', padding: 0 }}>{this.elements.map(this.renderElement)}</ul>;
	}
}

export default List;
