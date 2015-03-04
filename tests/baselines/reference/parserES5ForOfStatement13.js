//// [parserES5ForOfStatement13.ts]
for (let {a, b} of X) {
}

//// [parserES5ForOfStatement13.js]
for (var _i = 0, _a = X; _i < _a.length; _i++) {
    var _a_1 = _a[_i], a = _a_1.a, b = _a_1.b;
}
