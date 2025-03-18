//// [tests/cases/conformance/es6/destructuring/nonIterableRestElement2.ts] ////

//// [nonIterableRestElement2.ts]
var c = {};
[...c] = ["", 0];

//// [nonIterableRestElement2.js]
var c = {};
[...c] = ["", 0];
