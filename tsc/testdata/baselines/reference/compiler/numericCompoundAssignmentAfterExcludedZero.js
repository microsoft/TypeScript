//// [tests/cases/compiler/numericCompoundAssignmentAfterExcludedZero.ts] ////

//// [numericCompoundAssignmentAfterExcludedZero.ts]
function divide(value: number, divisor: number) {
    if (value === 0) return;
    value /= divisor;
}


//// [numericCompoundAssignmentAfterExcludedZero.js]
"use strict";
function divide(value, divisor) {
    if (value === 0)
        return;
    value /= divisor;
}
