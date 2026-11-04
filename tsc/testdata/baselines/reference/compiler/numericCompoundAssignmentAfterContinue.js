//// [tests/cases/compiler/numericCompoundAssignmentAfterContinue.ts] ////

//// [numericCompoundAssignmentAfterContinue.ts]
function consume(count: number) {
    for (;;) {
        if (count === 0) continue;
        count -= 1;
    }
}


//// [numericCompoundAssignmentAfterContinue.js]
"use strict";
function consume(count) {
    for (;;) {
        if (count === 0)
            continue;
        count -= 1;
    }
}
