//// [tests/cases/compiler/unreachableJavascriptUnchecked.ts] ////

//// [unreachable.js]
function unreachable() {
    return 1;
    return 2;
}

//// [unreachable.js]
"use strict";
function unreachable() {
    return 1;
    return 2;
}
