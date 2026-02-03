//// [tests/cases/conformance/parser/ecmascript5/ClassDeclarations/parserClassDeclarationIndexSignature1.ts] ////

//// [parserClassDeclarationIndexSignature1.ts]
class C {
    [index:number]:number
}

//// [parserClassDeclarationIndexSignature1.js]
var C = /** @class */ (function () {
    function C() {
    }
    return C;
}());
