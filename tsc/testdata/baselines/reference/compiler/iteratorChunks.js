//// [tests/cases/compiler/iteratorChunks.ts] ////

//// [iteratorChunks.ts]
const a: number[][] = Iterator.from([1, 2, 3]).chunks(2).toArray();

Iterator.from([1, 2, 3]).chunks("2");


//// [iteratorChunks.js]
"use strict";
const a = Iterator.from([1, 2, 3]).chunks(2).toArray();
Iterator.from([1, 2, 3]).chunks("2");
