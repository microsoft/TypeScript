//// [tests/cases/conformance/parser/ecmascript5/ClassDeclarations/parserClassDeclaration22.ts] ////

//// [parserClassDeclaration22.ts]
class C {
    "foo"();
    "bar"() { }
}

//// [parserClassDeclaration22.js]
var C = /** @class */ (function () {
    function C() {
    }
    C.prototype["bar"] = function () { };
    return C;
}());
