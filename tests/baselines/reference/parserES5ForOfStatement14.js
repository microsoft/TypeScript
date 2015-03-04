//// [parserES5ForOfStatement14.ts]
for (let [a, b] of X) {
}

//// [parserES5ForOfStatement14.js]
for (var _i = 0, _a = X; _i < _a.length; _i++) {
    var _b = _a[_i], a = _b[0], b = _b[1];
}
