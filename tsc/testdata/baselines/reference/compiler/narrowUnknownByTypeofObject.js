//// [tests/cases/compiler/narrowUnknownByTypeofObject.ts] ////

//// [narrowUnknownByTypeofObject.ts]
function foo(x: unknown) {
    if (typeof x === "object") {
        x
    }
}


//// [narrowUnknownByTypeofObject.js]
"use strict";
function foo(x) {
    if (typeof x === "object") {
        x;
    }
}
