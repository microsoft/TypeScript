//// [tests/cases/compiler/forInStatement1.ts] ////

//// [forInStatement1.ts]
var expr: any;
for (var a in expr) {
}

//// [forInStatement1.js]
"use strict";
var expr;
for (var a in expr) {
}
