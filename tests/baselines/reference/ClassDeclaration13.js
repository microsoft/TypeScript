//// [tests/cases/compiler/ClassDeclaration13.ts] ////

//// [ClassDeclaration13.ts]
class C {
   foo();
   bar() { }
}

//// [ClassDeclaration13.js]
"use strict";
var C = /** @class */ (function () {
    function C() {
    }
    C.prototype.bar = function () { };
    return C;
}());
