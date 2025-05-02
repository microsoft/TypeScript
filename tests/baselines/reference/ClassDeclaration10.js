//// [tests/cases/compiler/ClassDeclaration10.ts] ////

//// [ClassDeclaration10.ts]
class C {
   constructor();
   foo();
}

//// [ClassDeclaration10.js]
var C = /** @class */ (function () {
    function C() {
    }
    return C;
}());
