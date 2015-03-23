//// [parserES5ForOfStatement13.ts]
for (let {a, b} of X) {
}

//// [parserES5ForOfStatement13.js]
for (var _i = 0; _i < X.length; _i++) {
    var _a = X[_i], _a_1 = _a.a, _b = _a.b;
}
