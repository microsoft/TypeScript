//// [tests/cases/conformance/statements/for-inStatements/for-inStatementsDestructuring6.ts] ////

//// [for-inStatementsDestructuring6.ts]
let b: number;
let c: string[];
declare let obj: { [s: string]: string };

for ([b, ...c] in obj) {}


//// [for-inStatementsDestructuring6.js]
var b;
var c;
for (var key_1 in obj) {
    b = key_1[0], c = key_1.slice(1);
}
