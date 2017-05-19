//// [parserClassDeclaration12.ts]
class C {
   constructor();
   constructor(a) { }
}

//// [parserClassDeclaration12.js]
var C = (function () {
    function C(a) {
    }
    return C;
}());
