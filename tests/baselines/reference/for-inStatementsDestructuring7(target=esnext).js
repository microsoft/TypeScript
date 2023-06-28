//// [tests/cases/conformance/statements/for-inStatements/for-inStatementsDestructuring7.ts] ////

//// [for-inStatementsDestructuring7.ts]
declare let obj: { [s: string]: string };

for (let [b, ...c] in obj) {
    b;
    c;
}


//// [for-inStatementsDestructuring7.js]
for (let [b, ...c] in obj) {
    b;
    c;
}
