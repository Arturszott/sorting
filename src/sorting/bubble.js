import { Swap, Compare } from './operations';

export default function sortBubble(array) {
	const isBigger = (a, b) => a > b;
	const localArray = [ ...array ];
	const operations = [];
	let shouldSort = true;

	while (shouldSort) {
		let iterationsSwapsCount = 0;

		for (let i = 0; i < localArray.length - 1; i++) {
			const compare = new Compare(i, i + 1, isBigger);

			operations.push(compare);

			if (compare.applyTo(localArray)) {
				const swap = new Swap(i, i + 1);

				swap.applyTo(localArray);
				operations.push(swap);
				iterationsSwapsCount++;
			}
		}

		shouldSort = Boolean(iterationsSwapsCount);
	}

	return operations;
}
