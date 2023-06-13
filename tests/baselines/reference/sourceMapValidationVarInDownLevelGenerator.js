//// [tests/cases/compiler/sourceMapValidationVarInDownLevelGenerator.ts] ////

//// [sourceMapValidationVarInDownLevelGenerator.ts]
function * f() {
    var x = 1, y;
}

//// [sourceMapValidationVarInDownLevelGenerator.js]
function f() {
    var x, y;
    return __generator(this, function (_a) {
        x = 1;
        return [2 /*return*/];
    });
}
//# sourceMappingURL=sourceMapValidationVarInDownLevelGenerator.js.map