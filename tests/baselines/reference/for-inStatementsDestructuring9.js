//// [tests/cases/conformance/statements/for-inStatements/for-inStatementsDestructuring9.ts] ////

//// [for-inStatementsDestructuring9.ts]
let length1: number;
declare let obj: { [s: string]: string };

for ({ length: length1 } in obj) {}


//// [for-inStatementsDestructuring9.js]
var length1;
for ({ length: length1 } in obj) { }
