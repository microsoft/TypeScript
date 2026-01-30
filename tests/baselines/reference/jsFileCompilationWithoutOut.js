//// [tests/cases/compiler/jsFileCompilationWithoutOut.ts] ////

//// [a.ts]
class c {
}

//// [b.js]
function foo() {
}


//// [a.js]
"use strict";
var c = /** @class */ (function () {
    function c() {
    }
    return c;
}());
