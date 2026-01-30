//// [tests/cases/conformance/classes/propertyMemberDeclarations/staticPropertyAndFunctionWithSameName.ts] ////

//// [staticPropertyAndFunctionWithSameName.ts]
class C {
    static f: number;
    f: number;
}

class D {
    static f: number;
    f() { }
}

//// [staticPropertyAndFunctionWithSameName.js]
"use strict";
var C = /** @class */ (function () {
    function C() {
    }
    return C;
}());
var D = /** @class */ (function () {
    function D() {
    }
    D.prototype.f = function () { };
    return D;
}());
