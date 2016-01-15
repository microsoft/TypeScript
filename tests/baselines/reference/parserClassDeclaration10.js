//// [parserClassDeclaration10.ts]
class C {
   constructor();
   foo();
}

//// [parserClassDeclaration10.js]
var C = (function () {
    function C() {
    }
    return C;
}());
