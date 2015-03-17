//// [parserES5ForOfStatement13.ts]
for (let {a, b} of X) {
}

//// [parserES5ForOfStatement13.js]
for (var _i = 0; _i < X.length; _i++) {
    var _a = X[_i], a = _a.a, b = _a.b;
}
