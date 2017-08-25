//// [unusedTypeParameterInMethod4.ts]
class A {
    public f1<X>() {

    }
}

//// [unusedTypeParameterInMethod4.js]
var A = /** @class */ (function () {
    function A() {
    }
    A.prototype.f1 = function () {
    };
    return A;
}());
