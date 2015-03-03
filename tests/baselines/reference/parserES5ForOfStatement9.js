//// [parserES5ForOfStatement9.ts]
for (let v of X) {
}

//// [parserES5ForOfStatement9.js]
for (var v, _i = 0, _a = X; _i < _a.length; _i++) {
    v = _a[_i];
}
