//// [tests/cases/conformance/statements/for-inStatements/for-inStatementsDestructuring2.ts] ////

//// [for-inStatementsDestructuring2.ts]
for (var {a, b} in []) {}

//// [for-inStatementsDestructuring2.js]
for (var _a = void 0, a = _a.a, b = _a.b in []) { }
