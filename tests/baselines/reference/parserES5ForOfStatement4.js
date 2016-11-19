//// [parserES5ForOfStatement4.ts]
for (var a = 1 of X) {
}

//// [parserES5ForOfStatement4.js]
for (var _i = 0, X_1 = X; _i < X_1.length; _i++) {
    var a = X_1[_i];
}
