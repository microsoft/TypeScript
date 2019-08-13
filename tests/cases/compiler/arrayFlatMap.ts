// @lib: es2019

const array: number[] = [];
const readonlyArray: ReadonlyArray<number> = [];
array.flatMap((): ReadonlyArray<number> => []); // ok
readonlyArray.flatMap((): ReadonlyArray<number> => []); // ok
