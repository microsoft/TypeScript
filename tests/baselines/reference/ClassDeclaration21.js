//// [ClassDeclaration21.ts]
class C {
    0();
    1() { }
}

//// [ClassDeclaration21.js]
var C = /** @class */ (function () {
    function C() {
    }
    C.prototype[1] = function () { };
    return C;
}());
