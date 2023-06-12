//// [tests/cases/conformance/parser/ecmascript5/Statements/parserES5ForOfStatement3.ts] ////

//// [parserES5ForOfStatement3.ts]
for (var a, b of X) {
}

//// [parserES5ForOfStatement3.js]
for (var _i = 0, X_1 = X; _i < X_1.length; _i++) {
    var a = X_1[_i];
}
