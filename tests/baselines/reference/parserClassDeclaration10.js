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
