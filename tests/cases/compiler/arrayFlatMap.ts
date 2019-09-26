// @lib: es2019

const array: number[] = [];
const readonlyArray: ReadonlyArray<number> = [];
array.flatMap((): ReadonlyArray<number> => []); // ok
readonlyArray.flatMap((): ReadonlyArray<number> => []); // ok

// #19535

const [x] = [""].flatMap(undefined as () => string[] | string[][]);
x == "";
