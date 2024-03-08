//// [tests/cases/compiler/ClassDeclaration22.ts] ////

//// [ClassDeclaration22.ts]
class C {
    "foo"();
    "bar"() { }
}

//// [ClassDeclaration22.js]
var C = /** @class */ (function () {
    function C() {
    }
    C.prototype["bar"] = function () { };
    return C;
}());
