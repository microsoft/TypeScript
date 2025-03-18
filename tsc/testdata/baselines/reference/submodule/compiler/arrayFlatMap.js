//// [tests/cases/compiler/arrayFlatMap.ts] ////

//// [arrayFlatMap.ts]
const array: number[] = [];
const readonlyArray: ReadonlyArray<number> = [];
array.flatMap((): ReadonlyArray<number> => []); // ok
readonlyArray.flatMap((): ReadonlyArray<number> => []); // ok


//// [arrayFlatMap.js]
const array = [];
const readonlyArray = [];
array.flatMap(() => []);
readonlyArray.flatMap(() => []);
