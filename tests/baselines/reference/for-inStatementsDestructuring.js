//// [tests/cases/conformance/statements/for-inStatements/for-inStatementsDestructuring.ts] ////

//// [for-inStatementsDestructuring.ts]
for (var [a, b] in []) {}

//// [for-inStatementsDestructuring.js]
for (var key_1 in []) {
    var a = key_1[0], b = key_1[1];
}
