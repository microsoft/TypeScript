//// [for-inStatementsDestructuring2.ts]
for (var {a, b} in []) {}

//// [for-inStatementsDestructuring2.js]
for (var _a in []) {
    var a = _a.a, b = _a.b;
}
