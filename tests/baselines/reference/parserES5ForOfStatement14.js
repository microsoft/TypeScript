//// [parserES5ForOfStatement14.ts]
for (let [a, b] of X) {
}

//// [parserES5ForOfStatement14.js]
for (var _i = 0, X_1 = X; _i < X_1.length; _i++) {
    var _a = X_1[_i], a = _a[0], b = _a[1];
}
