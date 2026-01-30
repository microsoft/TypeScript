//// [tests/cases/compiler/classMemberWithMissingIdentifier.ts] ////

//// [classMemberWithMissingIdentifier.ts]
class C { 
    public {};
}

//// [classMemberWithMissingIdentifier.js]
"use strict";
var C = /** @class */ (function () {
    function C() {
    }
    return C;
}());
{ }
;
