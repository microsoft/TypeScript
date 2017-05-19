//// [parserClassDeclaration13.ts]
class C {
   foo();
   bar() { }
}

//// [parserClassDeclaration13.js]
var C = (function () {
    function C() {
    }
    C.prototype.bar = function () { };
    return C;
}());
