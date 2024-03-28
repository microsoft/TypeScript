//// [tests/cases/conformance/types/tuple/wideningTuples3.ts] ////

//// [wideningTuples3.ts]
var a: [any];

var b = a = [undefined, null];

//// [wideningTuples3.js]
var a;
var b = a = [undefined, null];
