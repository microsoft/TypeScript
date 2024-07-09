//// [tests/cases/conformance/parser/ecmascript5/ClassDeclarations/parserClassDeclaration20.ts] ////

//// [parserClassDeclaration20.ts]
class C {
    0();
    "0"() { }
}

//// [parserClassDeclaration20.js]
var C = /** @class */ (function () {
    function C() {
    }
    C.prototype["0"] = function () { };
    return C;
}());
