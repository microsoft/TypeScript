//// [tests/cases/conformance/es6/destructuring/emptyArrayBindingPatternParameter02.ts] ////

//// [emptyArrayBindingPatternParameter02.ts]
function f(a, []) {
    var x, y, z;
}

//// [emptyArrayBindingPatternParameter02.js]
"use strict";
function f(a, []) {
    var x, y, z;
}


//// [emptyArrayBindingPatternParameter02.d.ts]
declare function f(a: any, []: Iterable<any, void, undefined>): void;
