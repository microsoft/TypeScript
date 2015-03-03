//// [parserES5ForOfStatement3.ts]
for (var a, b of X) {
}

//// [parserES5ForOfStatement3.js]
for (var a, _i = 0, _a = X; _i < _a.length; _i++) {
    a = _a[_i];
}
