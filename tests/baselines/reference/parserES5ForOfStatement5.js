//// [parserES5ForOfStatement5.ts]
for (var a: number of X) {
}

//// [parserES5ForOfStatement5.js]
for (var a, _i = 0, _a = X; _i < _a.length; _i++) {
    a = _a[_i];
}
