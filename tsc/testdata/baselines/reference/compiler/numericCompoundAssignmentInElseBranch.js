//// [tests/cases/compiler/numericCompoundAssignmentInElseBranch.ts] ////

//// [numericCompoundAssignmentInElseBranch.ts]
function accumulate(total: number, width: number, kernedWidth: number) {
    if (total === 0) {
        total += width;
    } else {
        total += kernedWidth;
    }
}


//// [numericCompoundAssignmentInElseBranch.js]
"use strict";
function accumulate(total, width, kernedWidth) {
    if (total === 0) {
        total += width;
    }
    else {
        total += kernedWidth;
    }
}
