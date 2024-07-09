//// [tests/cases/compiler/generatorReturnExpressionIsChecked.ts] ////

//// [generatorReturnExpressionIsChecked.ts]
function* f(): Iterator<number> {
    return invalid;
}


//// [generatorReturnExpressionIsChecked.js]
function* f() {
    return invalid;
}
