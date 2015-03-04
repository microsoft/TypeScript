//// [parserES5ForOfStatement11.ts]
for (const [a, b] of X) {
}

//// [parserES5ForOfStatement11.js]
for (var _i = 0, _a = X; _i < _a.length; _i++) {
    var _a_1 = _a[_i], a = _a_1[0], b = _a_1[1];
}
