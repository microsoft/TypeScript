//// [tests/cases/compiler/sourceMapValidationVarInDownLevelGenerator.ts] ////

//// [sourceMapValidationVarInDownLevelGenerator.ts]
function * f() {
    var x = 1, y;
}

//// [sourceMapValidationVarInDownLevelGenerator.js]
"use strict";
function* f() {
    var x = 1, y;
}
//# sourceMappingURL=sourceMapValidationVarInDownLevelGenerator.js.map