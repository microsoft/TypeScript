//// [parserClassDeclaration16.ts]
class C {
   foo();
   foo() { }
}

//// [parserClassDeclaration16.js]
var C = /** @class */ (function () {
    function C() {
    }
    C.prototype.foo = function () { };
    return C;
}());
