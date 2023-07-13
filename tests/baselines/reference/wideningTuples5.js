//// [tests/cases/conformance/types/tuple/wideningTuples5.ts] ////

//// [wideningTuples5.ts]
var [a, b] = [undefined, null];

//// [wideningTuples5.js]
var _a = [undefined, null], a = _a[0], b = _a[1];
