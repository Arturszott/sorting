import { executeSwap } from '../utils';
import { Swap } from './operations';

const isNextSmaller = (array, i) => array[i + 1] < array[i];

export default function sortBubble(array) {
	const localArray = [ ...array ];
	const operations = [];
	let shouldSort = true;

	while (shouldSort) {
		let iterationsSwapsCount = 0;

		for (let i = 0; i < localArray.length - 1; i++) {
			if (isNextSmaller(localArray, i)) {
				const operation = new Swap(i, i + 1);

				operation.applyTo(localArray);
				operations.push(operation);
				iterationsSwapsCount++;
			}
		}

		shouldSort = Boolean(iterationsSwapsCount);
	}

	return operations;
}
