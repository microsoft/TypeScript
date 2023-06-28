//// [tests/cases/conformance/statements/for-inStatements/for-inStatementsDestructuring4.ts] ////

//// [for-inStatementsDestructuring4.ts]
var a, b;
for ({a, b} in []) { }

//// [for-inStatementsDestructuring4.js]
var a, b;
for (var key_1 in []) {
    a = key_1.a, b = key_1.b;
}
