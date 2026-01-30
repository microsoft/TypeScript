//// [tests/cases/compiler/callOnClass.ts] ////

//// [callOnClass.ts]
class C { }
var c = C();
 


//// [callOnClass.js]
"use strict";
var C = /** @class */ (function () {
    function C() {
    }
    return C;
}());
var c = C();
