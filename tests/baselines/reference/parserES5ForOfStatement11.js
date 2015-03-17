//// [parserES5ForOfStatement11.ts]
for (const [a, b] of X) {
}

//// [parserES5ForOfStatement11.js]
for (var _i = 0; _i < X.length; _i++) {
    var _a = X[_i], a = _a[0], b = _a[1];
}
