export const executeSwap = (pair, array) => ([ array[pair[0]], array[pair[1]] ] = [ array[pair[1]], array[pair[0]] ]);
