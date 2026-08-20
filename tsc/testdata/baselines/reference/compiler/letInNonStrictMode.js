//// [tests/cases/compiler/letInNonStrictMode.ts] ////

//// [letInNonStrictMode.ts]
let [x] = [1];
let {a: y} = {a: 1};

//// [letInNonStrictMode.js]
"use strict";
let [x] = [1];
let { a: y } = { a: 1 };
