//// [tests/cases/compiler/ClassDeclaration14.ts] ////

//// [ClassDeclaration14.ts]
class C {
   foo();
   constructor();
}

//// [ClassDeclaration14.js]
var C = /** @class */ (function () {
    function C() {
    }
    return C;
}());
