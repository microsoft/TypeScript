//// [parserES5ForOfStatement15.ts]
for (var [a, b] of X) {
}

//// [parserES5ForOfStatement15.js]
for (var _i = 0, _a = X; _i < _a.length; _i++) {
    var _b = _a[_i], a = _b[0], b = _b[1];
}
