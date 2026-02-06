//// [tests/cases/conformance/parser/ecmascript5/Statements/parserES5ForOfStatement6.ts] ////

//// [parserES5ForOfStatement6.ts]
for (var a = 1, b = 2 of X) {
}

//// [parserES5ForOfStatement6.js]
"use strict";
for (var a = 1, b = 2 of X) {
}
