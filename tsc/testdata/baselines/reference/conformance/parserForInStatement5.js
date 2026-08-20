//// [tests/cases/conformance/parser/ecmascript5/Statements/parserForInStatement5.ts] ////

//// [parserForInStatement5.ts]
for (var a: number in X) {
}

//// [parserForInStatement5.js]
"use strict";
for (var a in X) {
}
