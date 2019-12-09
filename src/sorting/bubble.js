import { createOperations } from './operations';

export default function sortBubble(array) {
	const compareFn = (a, b) => a > b;
	const [ operations, compare, swap ] = createOperations(compareFn, array);

	let shouldSort = true;

	while (shouldSort) {
		let iterationsSwapsCount = 0;

		for (let i = 0; i < array.length - 1; i++) {
			if (compare(i, i + 1)) {
				swap(i, i + 1);
				iterationsSwapsCount++;
			}
		}

		shouldSort = Boolean(iterationsSwapsCount);
	}

	return operations;
}
