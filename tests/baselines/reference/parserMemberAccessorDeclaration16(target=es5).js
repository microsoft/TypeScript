//// [tests/cases/conformance/parser/ecmascript5/MemberAccessorDeclarations/parserMemberAccessorDeclaration16.ts] ////

//// [parserMemberAccessorDeclaration16.ts]
class C {
   set Foo(a = 1) { }
}

//// [parserMemberAccessorDeclaration16.js]
"use strict";
var C = /** @class */ (function () {
    function C() {
    }
    Object.defineProperty(C.prototype, "Foo", {
        set: function (a) {
            if (a === void 0) { a = 1; }
        },
        enumerable: false,
        configurable: true
    });
    return C;
}());
