//// [tests/cases/conformance/parser/ecmascript5/ClassDeclarations/parserClassDeclaration13.ts] ////

//// [parserClassDeclaration13.ts]
class C {
   foo();
   bar() { }
}

//// [parserClassDeclaration13.js]
var C = /** @class */ (function () {
    function C() {
    }
    C.prototype.bar = function () { };
    return C;
}());
