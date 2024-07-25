//// [tests/cases/conformance/parser/ecmascript5/Statements/parserES5ForOfStatement2.ts] ////

//// [parserES5ForOfStatement2.ts]
for (var of X) {
}

//// [parserES5ForOfStatement2.js]
for (var _i = 0, X_1 = X; _i < X_1.length; _i++) {
    var _a = X_1[_i];
}
