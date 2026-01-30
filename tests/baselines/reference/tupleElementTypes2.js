//// [tests/cases/conformance/types/tuple/tupleElementTypes2.ts] ////

//// [tupleElementTypes2.ts]
function f([a, b]: [number, any]) { }

//// [tupleElementTypes2.js]
"use strict";
function f(_a) {
    var a = _a[0], b = _a[1];
}
