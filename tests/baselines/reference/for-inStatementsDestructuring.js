//// [tests/cases/conformance/statements/for-inStatements/for-inStatementsDestructuring.ts] ////

//// [for-inStatementsDestructuring.ts]
for (var [a, b] in []) {}

//// [for-inStatementsDestructuring.js]
for (var _a = void 0, a = _a[0], b = _a[1] in []) { }
