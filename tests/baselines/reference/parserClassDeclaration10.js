//// [tests/cases/conformance/parser/ecmascript5/ClassDeclarations/parserClassDeclaration10.ts] ////

//// [parserClassDeclaration10.ts]
class C {
   constructor();
   foo();
}

//// [parserClassDeclaration10.js]
var C = /** @class */ (function () {
    function C() {
    }
    return C;
}());
