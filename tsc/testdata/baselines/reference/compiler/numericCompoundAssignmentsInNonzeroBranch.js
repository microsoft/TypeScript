//// [tests/cases/compiler/numericCompoundAssignmentsInNonzeroBranch.ts] ////

//// [numericCompoundAssignmentsInNonzeroBranch.ts]
function scale(value: number, factor: number) {
    if (value !== 0) {
        value *= -1;
        value *= factor;
    }
}


//// [numericCompoundAssignmentsInNonzeroBranch.js]
"use strict";
function scale(value, factor) {
    if (value !== 0) {
        value *= -1;
        value *= factor;
    }
}
