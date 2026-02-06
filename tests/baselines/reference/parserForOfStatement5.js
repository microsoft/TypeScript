//// [tests/cases/conformance/parser/ecmascript6/Iterators/parserForOfStatement5.ts] ////

//// [parserForOfStatement5.ts]
for (var a: number of X) {
}

//// [parserForOfStatement5.js]
"use strict";
for (var a of X) {
}
