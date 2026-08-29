//// [tests/cases/compiler/iteratorIncludes.ts] ////

//// [iteratorIncludes.ts]
const includes: boolean = Iterator.from([1, 2, 3]).includes(2);
const includesAfterSkipping: boolean = Iterator.from([1, 2, 3]).includes(2, 1);

// @ts-expect-error the searched value must match the iterator value
Iterator.from([1, 2, 3]).includes("1");

// @ts-expect-error skipped elements must be a number
Iterator.from([1, 2, 3]).includes(2, "1");


//// [iteratorIncludes.js]
"use strict";
const includes = Iterator.from([1, 2, 3]).includes(2);
const includesAfterSkipping = Iterator.from([1, 2, 3]).includes(2, 1);
// @ts-expect-error the searched value must match the iterator value
Iterator.from([1, 2, 3]).includes("1");
// @ts-expect-error skipped elements must be a number
Iterator.from([1, 2, 3]).includes(2, "1");
