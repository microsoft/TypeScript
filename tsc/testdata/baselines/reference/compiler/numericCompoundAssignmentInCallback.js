//// [tests/cases/compiler/numericCompoundAssignmentInCallback.ts] ////

//// [numericCompoundAssignmentInCallback.ts]
function createConsumer(count: number) {
    return () => {
        if (count === 0) return;
        count -= 1;
    };
}


//// [numericCompoundAssignmentInCallback.js]
"use strict";
function createConsumer(count) {
    return () => {
        if (count === 0)
            return;
        count -= 1;
    };
}
