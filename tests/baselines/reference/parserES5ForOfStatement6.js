//// [parserES5ForOfStatement6.ts]
for (var a = 1, b = 2 of X) {
}

//// [parserES5ForOfStatement6.js]
for (var _i = 0; _i < X.length; _i++) {
    var a = 1 = X[_i];
}
