//// [parserES5ForOfStatement16.ts]
for (var {a, b} of X) {
}

//// [parserES5ForOfStatement16.js]
for (var _i = 0, _a = X; _i < _a.length; _i++) {
    var _a_1 = _a[_i], a = _a_1.a, b = _a_1.b;
}
