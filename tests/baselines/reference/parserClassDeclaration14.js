//// [parserClassDeclaration14.ts]
class C {
   foo();
   constructor();
}

//// [parserClassDeclaration14.js]
var C = (function () {
    function C() {
    }
    return C;
}());
