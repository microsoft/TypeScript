//// [parserES5ForOfStatement12.ts]
for (const {a, b} of X) {
}

//// [parserES5ForOfStatement12.js]
for (var _i = 0, _a = X; _i < _a.length; _i++) {
    var _b = _a[_i], a = _b.a, b = _b.b;
}
