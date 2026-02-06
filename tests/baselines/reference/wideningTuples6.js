//// [tests/cases/conformance/types/tuple/wideningTuples6.ts] ////

//// [wideningTuples6.ts]
var [a, b] = [undefined, null];
a = "";
b = "";

//// [wideningTuples6.js]
"use strict";
var [a, b] = [undefined, null];
a = "";
b = "";
