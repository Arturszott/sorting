import { createOperations } from './operations';

export default function sortInsertion(array) {
	const compareFn = (a, b) => a < b;
	const [ operations, compare, swap ] = createOperations(compareFn, array);

	for (let i = 0; i < array.length; i++) {
		let movableElementIndex = i;

		for (let j = movableElementIndex - 1; j >= 0; j--) {
			if (compare(movableElementIndex, j)) {
				swap(movableElementIndex, j);

				movableElementIndex = j;
			} else {
				j = 0;
			}
		}
	}

	return operations;
}
