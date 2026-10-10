//// [tests/cases/compiler/iteratorIncludes.ts] ////

//// [iteratorIncludes.ts]
const a: boolean = Iterator.from([1, 2, 3]).includes(2);
const b: boolean = Iterator.from([1, 2, 3]).includes(2, 1);

Iterator.from([1, 2, 3]).includes("1");

Iterator.from([1, 2, 3]).includes(2, "1");


//// [iteratorIncludes.js]
"use strict";
const a = Iterator.from([1, 2, 3]).includes(2);
const b = Iterator.from([1, 2, 3]).includes(2, 1);
Iterator.from([1, 2, 3]).includes("1");
Iterator.from([1, 2, 3]).includes(2, "1");
