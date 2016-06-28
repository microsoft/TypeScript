//// [parserClassDeclaration2.ts]
class C implements A implements B {
}

//// [parserClassDeclaration2.js]
var C = (function () {
    function C() {
    }
    return C;
}());
