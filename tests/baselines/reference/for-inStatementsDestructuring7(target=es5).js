//// [tests/cases/conformance/statements/for-inStatements/for-inStatementsDestructuring7.ts] ////

//// [for-inStatementsDestructuring7.ts]
declare let obj: { [s: string]: string };

for (let [b, ...c] in obj) {
    b;
    c;
}


//// [for-inStatementsDestructuring7.js]
for (var key_1 in obj) {
    var b = key_1[0], c = key_1.slice(1);
    b;
    c;
}
