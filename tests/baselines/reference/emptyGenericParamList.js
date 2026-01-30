//// [tests/cases/compiler/emptyGenericParamList.ts] ////

//// [emptyGenericParamList.ts]
class I<T> {}
var x: I<>;

//// [emptyGenericParamList.js]
"use strict";
var I = /** @class */ (function () {
    function I() {
    }
    return I;
}());
var x;
