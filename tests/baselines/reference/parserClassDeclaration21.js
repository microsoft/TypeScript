//// [tests/cases/conformance/parser/ecmascript5/ClassDeclarations/parserClassDeclaration21.ts] ////

//// [parserClassDeclaration21.ts]
class C {
    0();
    1() { }
}

//// [parserClassDeclaration21.js]
var C = /** @class */ (function () {
    function C() {
    }
    C.prototype[1] = function () { };
    return C;
}());
