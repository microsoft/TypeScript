//// [parserClassDeclaration16.ts]
class C {
   foo();
   foo() { }
}

//// [parserClassDeclaration16.js]
var C = (function () {
    function C() {
    }
    C.prototype.foo = function () { };
    return C;
}());
