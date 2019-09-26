//// [arrayFlatMap.ts]
const array: number[] = [];
const readonlyArray: ReadonlyArray<number> = [];
array.flatMap((): ReadonlyArray<number> => []); // ok
readonlyArray.flatMap((): ReadonlyArray<number> => []); // ok

// #19535

const [x] = [""].flatMap(undefined as () => string[] | string[][]);
x == "";


//// [arrayFlatMap.js]
var array = [];
var readonlyArray = [];
array.flatMap(function () { return []; }); // ok
readonlyArray.flatMap(function () { return []; }); // ok
// #19535
var x = [""].flatMap(undefined)[0];
x == "";
