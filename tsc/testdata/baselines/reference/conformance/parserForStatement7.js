//// [tests/cases/conformance/parser/ecmascript5/Statements/parserForStatement7.ts] ////

//// [parserForStatement7.ts]
for (new foo() in b) {
}

//// [parserForStatement7.js]
"use strict";
for (new foo() in b) {
}
