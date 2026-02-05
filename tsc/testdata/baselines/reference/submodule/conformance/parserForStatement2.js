//// [tests/cases/conformance/parser/ecmascript5/Statements/parserForStatement2.ts] ////

//// [parserForStatement2.ts]
var a;
var b = [];
var c;
for (a in b[c] = b[c] || [], d) {

}

//// [parserForStatement2.js]
"use strict";
var a;
var b = [];
var c;
for (a in b[c] = b[c] || [], d) {
}
