//// [tests/cases/conformance/parser/ecmascript6/Iterators/parserForOfStatement7.ts] ////

//// [parserForOfStatement7.ts]
for (var a: number = 1, b: string = "" of X) {
}

//// [parserForOfStatement7.js]
"use strict";
for (var a = 1, b = "" of X) {
}
