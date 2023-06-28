//// [tests/cases/conformance/statements/for-inStatements/for-inStatementsDestructuring2.ts] ////

//// [for-inStatementsDestructuring2.ts]
for (var {a, b} in []) {}

//// [for-inStatementsDestructuring2.js]
for (var key_1 in []) {
    var a = key_1.a, b = key_1.b;
}
