//// [tests/cases/conformance/types/tuple/tupleElementTypes1.ts] ////

//// [tupleElementTypes1.ts]
var [a, b]: [number, any] = [undefined, undefined];

//// [tupleElementTypes1.js]
var _a = [undefined, undefined], a = _a[0], b = _a[1];
