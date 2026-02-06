//// [tests/cases/conformance/parser/ecmascript5/MemberAccessorDeclarations/parserMemberAccessorDeclaration7.ts] ////

//// [parserMemberAccessorDeclaration7.ts]
class C {
    public public get Foo() { }
}

//// [parserMemberAccessorDeclaration7.js]
"use strict";
var C = /** @class */ (function () {
    function C() {
    }
    Object.defineProperty(C.prototype, "Foo", {
        get: function () { },
        enumerable: false,
        configurable: true
    });
    return C;
}());
