//// [tests/cases/compiler/iteratorJoin.ts] ////

//// [iteratorJoin.ts]
const joined: string = Iterator.from([1, 2, 3]).join("-");
const joinedWithDefaultSeparator: string = Iterator.from([1, 2, 3]).join();

// @ts-expect-error separator must be a string
Iterator.from([1, 2, 3]).join(0);


//// [iteratorJoin.js]
"use strict";
const joined = Iterator.from([1, 2, 3]).join("-");
const joinedWithDefaultSeparator = Iterator.from([1, 2, 3]).join();
// @ts-expect-error separator must be a string
Iterator.from([1, 2, 3]).join(0);
