//// [tests/cases/compiler/typeParameterListWithTrailingComma1.ts] ////

//// [typeParameterListWithTrailingComma1.ts]
class C<T,> {
}

//// [typeParameterListWithTrailingComma1.js]
"use strict";
var C = /** @class */ (function () {
    function C() {
    }
    return C;
}());
