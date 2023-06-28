//// [tests/cases/conformance/statements/for-inStatements/for-inStatementsDestructuring8.ts] ////

//// [for-inStatementsDestructuring8.ts]
declare let obj: { [s: string]: string };

for (let { length: length1 } in obj) {
    length1
}


//// [for-inStatementsDestructuring8.js]
for (var key_1 in obj) {
    var length1 = key_1.length;
    length1;
}
