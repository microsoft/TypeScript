//// [tests/cases/conformance/es6/destructuring/nonIterableRestElement1.ts] ////

//// [nonIterableRestElement1.ts]
var c = {};
[...c] = ["", 0];

//// [nonIterableRestElement1.js]
"use strict";
var c = {};
[...c] = ["", 0];
