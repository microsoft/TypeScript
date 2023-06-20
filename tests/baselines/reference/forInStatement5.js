//// [tests/cases/compiler/forInStatement5.ts] ////

//// [forInStatement5.ts]
var a: string;
var expr: any;
for (a in expr) {
}

//// [forInStatement5.js]
var a;
var expr;
for (a in expr) {
}
