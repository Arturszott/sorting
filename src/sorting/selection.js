import { Swap, Compare } from './operations';

export default function sortSelection(array) {
	const isSmaller = (a, b) => a < b;
	const localArray = [ ...array ];
	const operations = [];
	let lastUnsortedElementIndex = 0;
	let shouldSort = true;

	while (shouldSort) {
		let smallestNumberIndex = lastUnsortedElementIndex;

		for (let i = lastUnsortedElementIndex; i < localArray.length; i++) {
			const compare = new Compare(i, smallestNumberIndex, isSmaller);

			operations.push(compare);

			if (compare.applyTo(localArray)) {
				smallestNumberIndex = i;
			}
		}

		if (lastUnsortedElementIndex !== smallestNumberIndex) {
			const swap = new Swap(lastUnsortedElementIndex, smallestNumberIndex);

			swap.applyTo(localArray);
			operations.push(swap);
		}

		lastUnsortedElementIndex++;
		shouldSort = lastUnsortedElementIndex < array.length;
	}

	return operations;
}
