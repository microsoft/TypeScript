//// [ClassDeclaration10.ts]
class C {
   constructor();
   foo();
}

//// [ClassDeclaration10.js]
var C = (function () {
    function C() {
    }
    return C;
}());
