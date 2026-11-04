//// [tests/cases/compiler/excludedNumericLiteralAfterDecrement.ts] ////

//// [excludedNumericLiteralAfterDecrement.ts]
function decrement(count: number) {
    if (count === 0) return;
    count--;
    if (count === 0) return;
}


//// [excludedNumericLiteralAfterDecrement.js]
"use strict";
function decrement(count) {
    if (count === 0)
        return;
    count--;
    if (count === 0)
        return;
}
