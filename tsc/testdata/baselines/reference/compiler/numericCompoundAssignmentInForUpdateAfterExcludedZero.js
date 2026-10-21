//// [tests/cases/compiler/numericCompoundAssignmentInForUpdateAfterExcludedZero.ts] ////

//// [numericCompoundAssignmentInForUpdateAfterExcludedZero.ts]
function shift(bitmap: number) {
    for (let index = 0; bitmap !== 0; index++, bitmap >>>= 1) {}
}


//// [numericCompoundAssignmentInForUpdateAfterExcludedZero.js]
"use strict";
function shift(bitmap) {
    for (let index = 0; bitmap !== 0; index++, bitmap >>>= 1) { }
}
