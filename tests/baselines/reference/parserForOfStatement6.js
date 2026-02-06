//// [tests/cases/conformance/parser/ecmascript6/Iterators/parserForOfStatement6.ts] ////

//// [parserForOfStatement6.ts]
for (var a = 1, b = 2 of X) {
}

//// [parserForOfStatement6.js]
"use strict";
for (var a = 1, b = 2 of X) {
}
