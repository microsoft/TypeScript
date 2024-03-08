//// [tests/cases/compiler/ClassDeclaration8.ts] ////

//// [ClassDeclaration8.ts]
class C {
  constructor();
}

//// [ClassDeclaration8.js]
var C = /** @class */ (function () {
    function C() {
    }
    return C;
}());
