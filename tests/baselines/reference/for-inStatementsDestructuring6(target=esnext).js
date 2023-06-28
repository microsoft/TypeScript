//// [tests/cases/conformance/statements/for-inStatements/for-inStatementsDestructuring6.ts] ////

//// [for-inStatementsDestructuring6.ts]
let b: number;
let c: string[];
declare let obj: { [s: string]: string };

for ([b, ...c] in obj) {}


//// [for-inStatementsDestructuring6.js]
let b;
let c;
for ([b, ...c] in obj) { }
