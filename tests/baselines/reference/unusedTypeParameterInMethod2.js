//// [unusedTypeParameterInMethod2.ts]
class A {
    public f1<X, Y, Z>() {
        var a: X;
        var b: Z;
        a;
        b;
    }
}

//// [unusedTypeParameterInMethod2.js]
var A = (function () {
    function A() {
    }
    var proto_1 = A.prototype;
    proto_1.f1 = function () {
        var a;
        var b;
        a;
        b;
    };
    return A;
}());
