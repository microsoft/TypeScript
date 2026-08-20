//// [tests/cases/conformance/parser/ecmascript5/RegressionTests/parser512097.ts] ////

//// [parser512097.ts]
var tt = { aa; }

if (true) {
}

//// [parser512097.js]
"use strict";
var tt = { aa, };
if (true) {
}
