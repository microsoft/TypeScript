//// [tests/cases/compiler/forInStatement2.ts] ////

//// [forInStatement2.ts]
declare var expr: number;
for (var a in expr) {
}

//// [forInStatement2.js]
for (var a in expr) {
}
