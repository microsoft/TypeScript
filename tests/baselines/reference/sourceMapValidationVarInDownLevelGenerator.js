//// [tests/cases/compiler/sourceMapValidationVarInDownLevelGenerator.ts] ////

//// [sourceMapValidationVarInDownLevelGenerator.ts]
function * f() {
    var x = 1, y;
}

//// [sourceMapValidationVarInDownLevelGenerator.js]
function* f() {
    var x = 1, y;
}
//# sourceMappingURL=sourceMapValidationVarInDownLevelGenerator.js.map