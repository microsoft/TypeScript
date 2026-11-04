//// [tests/cases/compiler/embeddedNumericCompoundAssignmentAfterExcludedLiterals.ts] ////

//// [embeddedNumericCompoundAssignmentAfterExcludedLiterals.ts]
function ease(value: number, divisor: number) {
    if (value === 0) return 0;
    value /= divisor;
    if (value === 2) return 2;
    return Math.pow(2, -10 * (value -= 1));
}


//// [embeddedNumericCompoundAssignmentAfterExcludedLiterals.js]
"use strict";
function ease(value, divisor) {
    if (value === 0)
        return 0;
    value /= divisor;
    if (value === 2)
        return 2;
    return Math.pow(2, -10 * (value -= 1));
}
