//// [tests/cases/compiler/numericCompoundAssignmentAfterBreak.ts] ////

//// [numericCompoundAssignmentAfterBreak.ts]
function drain(count: number) {
    for (;;) {
        if (count === 0) break;
        count -= 1;
    }
}


//// [numericCompoundAssignmentAfterBreak.js]
"use strict";
function drain(count) {
    for (;;) {
        if (count === 0)
            break;
        count -= 1;
    }
}
