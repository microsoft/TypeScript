// @lib: es2019

const array: number[] = [];
const readonlyArray: ReadonlyArray<number> = [];
array.flatMap((): ReadonlyArray<number> => []); // ok
readonlyArray.flatMap((): ReadonlyArray<number> => []); // ok

// #19535

let [actual] = [""].flatMap(undefined as () => string[] | string[][]);
const expected: string | string[] = actual;
actual = undefined as string | string[];
