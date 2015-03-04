//// [parserES5ForOfStatement4.ts]
for (var a = 1 of X) {
}

//// [parserES5ForOfStatement4.js]
for (var a = 1, _i = 0, _a = X; _i < _a.length; _i++) {
    a = _a[_i];
}
