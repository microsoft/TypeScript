//// [tests/cases/conformance/statements/for-inStatements/for-inStatementsDestructuring5.ts] ////

//// [for-inStatementsDestructuring5.ts]
let a: string;
declare let obj: { [s: string]: string };

for ([a] in obj) {}


//// [for-inStatementsDestructuring5.js]
let a;
for ([a] in obj) { }
