//// [tests/cases/compiler/arrayFlatMap.ts] ////

//// [arrayFlatMap.ts]
const array: number[] = [];
const readonlyArray: ReadonlyArray<number> = [];
array.flatMap((): ReadonlyArray<number> => []); // ok
readonlyArray.flatMap((): ReadonlyArray<number> => []); // ok


//// [arrayFlatMap.js]
var array = [];
var readonlyArray = [];
array.flatMap(function () { return []; }); // ok
readonlyArray.flatMap(function () { return []; }); // ok
