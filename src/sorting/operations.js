import { executeSwap } from '../utils';

class Operation {
	constructor(indexA, indexB) {
		this.pair = [ indexA, indexB ];
	}
}

export class Swap extends Operation {
	applyTo(array) {
		executeSwap(this.pair, array);
	}
}
export class Compare extends Operation {
	constructor(indexA, indexB, fn) {
		super(indexA, indexB);
		this.compareWith = fn;
	}

	applyTo(array) {
		const [ a, b ] = this.pair;

		return this.compareWith(array[a], array[b]);
	}
}

export const createOperations = (compareFn, array) => {
	const localArray = [ ...array ];
	const operations = [];

	const compareAtIndex = (a, b) => {
		const compare = new Compare(a, b, compareFn);

		operations.push(compare);

		return compare.applyTo(localArray);
	};
	const swapAtIndex = (a, b) => {
		const swap = new Swap(a, b);

		operations.push(swap);

		swap.applyTo(localArray);
	};

	return [ operations, compareAtIndex, swapAtIndex ];
};
