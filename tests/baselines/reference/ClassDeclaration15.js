//// [ClassDeclaration15.ts]
class C {
   foo();
   constructor() { }
}

//// [ClassDeclaration15.js]
var C = (function () {
    function C() {
    }
    return C;
}());
