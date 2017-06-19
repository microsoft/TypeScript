//// [parserClassDeclaration15.ts]
class C {
   foo();
   constructor() { }
}

//// [parserClassDeclaration15.js]
var C = /** @class */ (function () {
    function C() {
    }
    return C;
}());
