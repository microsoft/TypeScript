//// [tests/cases/conformance/types/tuple/wideningTuples4.ts] ////

//// [wideningTuples4.ts]
var a: [any];

var b = a = [undefined, null];
b = ["", ""];

//// [wideningTuples4.js]
var a;
var b = a = [undefined, null];
b = ["", ""];
