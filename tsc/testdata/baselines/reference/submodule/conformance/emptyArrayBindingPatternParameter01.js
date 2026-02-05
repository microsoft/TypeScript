//// [tests/cases/conformance/es6/destructuring/emptyArrayBindingPatternParameter01.ts] ////

//// [emptyArrayBindingPatternParameter01.ts]
function f([]) {
    var x, y, z;
}

//// [emptyArrayBindingPatternParameter01.js]
"use strict";
function f([]) {
    var x, y, z;
}


//// [emptyArrayBindingPatternParameter01.d.ts]
declare function f([]: Iterable<any, void, undefined>): void;
