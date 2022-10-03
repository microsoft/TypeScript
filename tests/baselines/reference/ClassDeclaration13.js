//// [ClassDeclaration13.ts]
class C {
   foo();
   bar() { }
}

//// [ClassDeclaration13.js]
var C = /** @class */ (function () {
    function C() {
    }
    C.prototype.bar = function () { };
    return C;
}());
