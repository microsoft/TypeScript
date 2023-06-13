//// [tests/cases/conformance/classes/propertyMemberDeclarations/staticAndNonStaticPropertiesSameName.ts] ////

//// [staticAndNonStaticPropertiesSameName.ts]
class C {
    x: number;
    static x: number;

    f() { }
    static f() { }
}

//// [staticAndNonStaticPropertiesSameName.js]
var C = /** @class */ (function () {
    function C() {
    }
    C.prototype.f = function () { };
    C.f = function () { };
    return C;
}());
