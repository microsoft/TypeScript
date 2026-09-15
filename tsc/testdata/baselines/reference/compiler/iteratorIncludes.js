//// [tests/cases/compiler/iteratorIncludes.ts] ////

//// [iteratorIncludes.ts]
const includes: boolean = Iterator.from([1, 2, 3]).includes(2);
const includesAfterSkipping: boolean = Iterator.from([1, 2, 3]).includes(2, 1);

Iterator.from([1, 2, 3]).includes("1");

Iterator.from([1, 2, 3]).includes(2, "1");


//// [iteratorIncludes.js]
"use strict";
const includes = Iterator.from([1, 2, 3]).includes(2);
const includesAfterSkipping = Iterator.from([1, 2, 3]).includes(2, 1);
Iterator.from([1, 2, 3]).includes("1");
Iterator.from([1, 2, 3]).includes(2, "1");
