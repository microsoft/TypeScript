//// [tests/cases/compiler/classWithEmptyTypeParameter.ts] ////

//// [classWithEmptyTypeParameter.ts]
class C<> {
}

//// [classWithEmptyTypeParameter.js]
"use strict";
var C = /** @class */ (function () {
    function C() {
    }
    return C;
}());
