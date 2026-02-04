//// [tests/cases/conformance/parser/ecmascript5/MemberAccessorDeclarations/parserMemberAccessorDeclaration3.ts] ////

//// [parserMemberAccessorDeclaration3.ts]
class C {
  get 0() { }
}

//// [parserMemberAccessorDeclaration3.js]
"use strict";
var C = /** @class */ (function () {
    function C() {
    }
    Object.defineProperty(C.prototype, 0, {
        get: function () { },
        enumerable: false,
        configurable: true
    });
    return C;
}());
