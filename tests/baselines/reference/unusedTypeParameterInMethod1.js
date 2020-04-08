//// [unusedTypeParameterInMethod1.ts]
class A {
    public f1<X, Y, Z>() {
        var a: Y;
        var b: Z;
        a;
        b;
    }
}

//// [unusedTypeParameterInMethod1.js]
var A = /** @class */ (function () {
    function A() {
    }
    A.prototype.f1 = function () {
        var a;
        var b;
        a;
        b;
    };
    return A;
}());
