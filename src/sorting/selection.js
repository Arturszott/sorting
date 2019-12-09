import { createOperations } from './operations';

export default function sortSelection(array) {
	const compareFn = (a, b) => a < b;
	const [ operations, compare, swap ] = createOperations(compareFn, array);

	let lastUnsortedElementIndex = 0;
	let shouldSort = true;

	while (shouldSort) {
		let smallestNumberIndex = lastUnsortedElementIndex;

		for (let i = lastUnsortedElementIndex; i < array.length; i++) {
			if (compare(i, smallestNumberIndex)) {
				smallestNumberIndex = i;
			}
		}

		if (lastUnsortedElementIndex !== smallestNumberIndex) {
			swap(lastUnsortedElementIndex, smallestNumberIndex);
		}

		lastUnsortedElementIndex++;
		shouldSort = lastUnsortedElementIndex < array.length;
	}

	return operations;
}
