//// [arrayFlatMap.ts]
const array: number[] = [];
const readonlyArray: ReadonlyArray<number> = [];
array.flatMap((): ReadonlyArray<number> => []); // ok
readonlyArray.flatMap((): ReadonlyArray<number> => []); // ok

// #19535

let [actual] = [""].flatMap(undefined as () => string[] | string[][]);
const expected: string | string[] = actual;
actual = undefined as string | string[];


//// [arrayFlatMap.js]
var array = [];
var readonlyArray = [];
array.flatMap(function () { return []; }); // ok
readonlyArray.flatMap(function () { return []; }); // ok
// #19535
var actual = [""].flatMap(undefined)[0];
var expected = actual;
actual = undefined;
