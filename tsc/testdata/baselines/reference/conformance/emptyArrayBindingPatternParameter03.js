//// [tests/cases/conformance/es6/destructuring/emptyArrayBindingPatternParameter03.ts] ////

//// [emptyArrayBindingPatternParameter03.ts]
function f(a, []) {
    var x, y, z;
}

//// [emptyArrayBindingPatternParameter03.js]
"use strict";
function f(a, []) {
    var x, y, z;
}


//// [emptyArrayBindingPatternParameter03.d.ts]
declare function f(a: any, []: Iterable<any, void, undefined>): void;
