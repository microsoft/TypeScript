//// [parserES5ForOfStatement14.ts]
for (let [a, b] of X) {
}

//// [parserES5ForOfStatement14.js]
for (var _i = 0, _a = X; _i < _a.length; _i++) {
    var _a_1 = _a[_i], a = _a_1[0], b = _a_1[1];
}
