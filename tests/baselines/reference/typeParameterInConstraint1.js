//// [tests/cases/compiler/typeParameterInConstraint1.ts] ////

//// [typeParameterInConstraint1.ts]
class C<T, U extends T> {
}

//// [typeParameterInConstraint1.js]
"use strict";
var C = /** @class */ (function () {
    function C() {
    }
    return C;
}());
