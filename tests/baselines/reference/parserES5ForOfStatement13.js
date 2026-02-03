//// [tests/cases/conformance/parser/ecmascript5/Statements/parserES5ForOfStatement13.ts] ////

//// [parserES5ForOfStatement13.ts]
for (let {a, b} of X) {
}

//// [parserES5ForOfStatement13.js]
for (var _i = 0, X_1 = X; _i < X_1.length; _i++) {
    var _a = X_1[_i], a = _a.a, b = _a.b;
}
