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
