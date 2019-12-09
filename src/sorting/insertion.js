import { Swap, Compare } from './operations';

export default function sortInsertion(array) {
	const isSmaller = (a, b) => a < b;
	const localArray = [ ...array ];
	const operations = [];

	for (let i = 0; i < localArray.length; i++) {
		let movableElementIndex = i;

		for (let j = movableElementIndex - 1; j >= 0; j--) {
			const compare = new Compare(movableElementIndex, j, isSmaller);

			operations.push(compare);

			if (compare.applyTo(localArray)) {
				const swap = new Swap(movableElementIndex, j);

				swap.applyTo(localArray);
				operations.push(swap);

				movableElementIndex = j;
			} else {
				j = 0;
			}
		}
	}

	return operations;
}
