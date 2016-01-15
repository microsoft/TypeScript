//// [ClassDeclaration13.ts]
class C {
   foo();
   bar() { }
}

//// [ClassDeclaration13.js]
var C = (function () {
    function C() {
    }
    C.prototype.bar = function () { };
    return C;
}());
