//// [tests/cases/compiler/iteratorChunks.ts] ////

//// [iteratorChunks.ts]
const chunks: number[][] = Iterator.from([1, 2, 3]).chunks(2).toArray();

// @ts-expect-error chunk size must be a number
Iterator.from([1, 2, 3]).chunks("2");


//// [iteratorChunks.js]
"use strict";
const chunks = Iterator.from([1, 2, 3]).chunks(2).toArray();
// @ts-expect-error chunk size must be a number
Iterator.from([1, 2, 3]).chunks("2");
