//// [tests/cases/compiler/numericCompoundAssignmentsAfterConjunction.ts] ////

//// [numericCompoundAssignmentsAfterConjunction.ts]
function scale(left: number, right: number) {
    if (left !== 0 && right !== 0) {
        left *= -1.5;
        right *= -1.5;
    } else if (left !== 0) {
        left *= -2;
    } else if (right !== 0) {
        right *= -2;
    }
}


//// [numericCompoundAssignmentsAfterConjunction.js]
"use strict";
function scale(left, right) {
    if (left !== 0 && right !== 0) {
        left *= -1.5;
        right *= -1.5;
    }
    else if (left !== 0) {
        left *= -2;
    }
    else if (right !== 0) {
        right *= -2;
    }
}
