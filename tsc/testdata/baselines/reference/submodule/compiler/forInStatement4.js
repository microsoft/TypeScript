//// [tests/cases/compiler/forInStatement4.ts] ////

//// [forInStatement4.ts]
var expr: any;
for (var a: number in expr) {
}

//// [forInStatement4.js]
"use strict";
var expr;
for (var a in expr) {
}
