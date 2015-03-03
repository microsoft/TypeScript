//// [parserES5ForOfStatement10.ts]
for (const v of X) {
}

//// [parserES5ForOfStatement10.js]
for (var v, _i = 0, _a = X; _i < _a.length; _i++) {
    v = _a[_i];
}
