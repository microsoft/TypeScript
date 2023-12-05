//// [tests/cases/compiler/ClassDeclaration15.ts] ////

//// [ClassDeclaration15.ts]
class C {
   foo();
   constructor() { }
}

//// [ClassDeclaration15.js]
var C = /** @class */ (function () {
    function C() {
    }
    return C;
}());
