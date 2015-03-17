//// [parserES5ForOfStatement12.ts]
for (const {a, b} of X) {
}

//// [parserES5ForOfStatement12.js]
for (var _i = 0; _i < X.length; _i++) {
    var _a = X[_i], a = _a.a, b = _a.b;
}
