//// [ClassDeclaration11.ts]
class C {
   constructor();
   foo() { }
}

//// [ClassDeclaration11.js]
var C = (function () {
    function C() {
    }
    C.prototype.foo = function () { };
    return C;
}());
