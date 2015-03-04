//// [parserES5ForOfStatement12.ts]
for (const {a, b} of X) {
}

//// [parserES5ForOfStatement12.js]
for (var _i = 0, _a = X; _i < _a.length; _i++) {
    var _a_1 = _a[_i], a = _a_1.a, b = _a_1.b;
}
