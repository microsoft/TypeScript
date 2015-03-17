//// [parserES5ForOfStatement14.ts]
for (let [a, b] of X) {
}

//// [parserES5ForOfStatement14.js]
for (var _i = 0; _i < X.length; _i++) {
    var _a = X[_i], a = _a[0], b = _a[1];
}
