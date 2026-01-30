//// [tests/cases/compiler/duplicateIdentifierComputedName.ts] ////

//// [duplicateIdentifierComputedName.ts]
class C {
    ["a"]: string;
    ["a"]: string;
}


//// [duplicateIdentifierComputedName.js]
"use strict";
var C = /** @class */ (function () {
    function C() {
    }
    return C;
}());
