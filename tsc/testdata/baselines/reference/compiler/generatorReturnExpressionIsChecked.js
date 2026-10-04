//// [tests/cases/compiler/generatorReturnExpressionIsChecked.ts] ////

//// [generatorReturnExpressionIsChecked.ts]
function* f(): Iterator<number> {
    return invalid;
}


//// [generatorReturnExpressionIsChecked.js]
"use strict";
function* f() {
    return invalid;
}
