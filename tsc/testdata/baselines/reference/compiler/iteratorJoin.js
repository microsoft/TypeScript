//// [tests/cases/compiler/iteratorJoin.ts] ////

//// [iteratorJoin.ts]
const a: string = Iterator.from([1, 2, 3]).join("-");
const b: string = Iterator.from([1, 2, 3]).join();

Iterator.from([1, 2, 3]).join(0);


//// [iteratorJoin.js]
"use strict";
const a = Iterator.from([1, 2, 3]).join("-");
const b = Iterator.from([1, 2, 3]).join();
Iterator.from([1, 2, 3]).join(0);
