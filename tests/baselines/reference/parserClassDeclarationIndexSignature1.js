//// [parserClassDeclarationIndexSignature1.ts]
class C {
    [index:number]:number
}

//// [parserClassDeclarationIndexSignature1.js]
var C = (function () {
    function C() {
    }
    return C;
}());
