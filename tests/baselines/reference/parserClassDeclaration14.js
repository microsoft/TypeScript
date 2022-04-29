//// [parserClassDeclaration14.ts]
class C {
   foo();
   constructor();
}

//// [parserClassDeclaration14.js]
var C = /** @class */ (function () {
    function C() {
    }
    return C;
}());
