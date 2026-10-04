//// [tests/cases/compiler/nonexistentPropertyUnavailableOnPromisedType.ts] ////

//// [nonexistentPropertyUnavailableOnPromisedType.ts]
function f(x: Promise<number>) {
    x.toLowerCase();
}


//// [nonexistentPropertyUnavailableOnPromisedType.js]
"use strict";
function f(x) {
    x.toLowerCase();
}
