
// @noEmit: true
// @target: es5, esnext
// @strict: true

export let array = [0, 2, 3, 4];

function somePredicate(x: any): boolean {
    return x === 4;
}

export let lastIndex1 = array.findLastIndex(v => v === 4);
export let lastIndex2 = array.findLastIndex(somePredicate);

export let last1 = array.findLast(somePredicate);
export let last2 = array.findLast(somePredicate);

export let sorted = array.toSorted();

export let spliced1 = array.toSpliced(2);
export let spliced2 = array.toSpliced(2, 1);
export let spliced3 = array.toSpliced(2, 1, 4, 5, 6, 7);
export let spliced4 = array.toSpliced(2, undefined);
export let spliced5 = array.toSpliced(2, undefined, 4, 5, 6, 7);

export let startsWithOne = array.with(0, 1);
export let inTheEnd = array.with(-1, 1);