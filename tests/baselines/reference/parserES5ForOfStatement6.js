//// [parserES5ForOfStatement6.ts]
for (var a = 1, b = 2 of X) {
}

//// [parserES5ForOfStatement6.js]
for (var a, _i = 0, _a = X; _i < _a.length; _i++) {
    a = _a[_i];
}
