//// [tests/cases/compiler/numericCompoundAssignmentInWhileLoopAfterExcludedZero.ts] ////

//// [numericCompoundAssignmentInWhileLoopAfterExcludedZero.ts]
function rewind(index: number) {
    while (index !== 0) {
        index -= 1;
    }
}


//// [numericCompoundAssignmentInWhileLoopAfterExcludedZero.js]
"use strict";
function rewind(index) {
    while (index !== 0) {
        index -= 1;
    }
}
