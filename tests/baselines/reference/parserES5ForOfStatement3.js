//// [parserES5ForOfStatement3.ts]
for (var a, b of X) {
}

//// [parserES5ForOfStatement3.js]
for (var _i = 0; _i < X.length; _i++) {
    var a = X[_i];
}
