//// [tests/cases/conformance/classes/classDeclarations/classWithSemicolonClassElement2.ts] ////

//// [classWithSemicolonClassElement2.ts]
class C {
    ;
    ;
}

//// [classWithSemicolonClassElement2.js]
"use strict";
var C = /** @class */ (function () {
    function C() {
    }
    ;
    ;
    return C;
}());
