//// [unusedTypeParameterInMethod4.ts]
class A {
    public f1<X>() {

    }
}

//// [unusedTypeParameterInMethod4.js]
var A = (function () {
    function A() {
    }
    A.prototype.f1 = function () {
    };
    return A;
}());
