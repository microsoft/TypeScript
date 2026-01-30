//// [tests/cases/conformance/classes/classDeclarations/classWithSemicolonClassElement1.ts] ////

//// [classWithSemicolonClassElement1.ts]
class C {
    ;
}

//// [classWithSemicolonClassElement1.js]
"use strict";
var C = /** @class */ (function () {
    function C() {
    }
    ;
    return C;
}());
