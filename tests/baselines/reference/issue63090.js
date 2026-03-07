//// [tests/cases/compiler/issue63090.ts] ////

//// [issue63090.ts]
type N<T, K extends string> = T | { [P in K]: N<keyof T, K> }[K];
type M = N<number, "M">;


//// [issue63090.js]
"use strict";
