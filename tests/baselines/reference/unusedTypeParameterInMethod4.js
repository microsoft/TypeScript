//// [unusedTypeParameterInMethod4.ts]
class A {
    public f1<X>() {

    }
}

//// [unusedTypeParameterInMethod4.js]
var A = (function () {
    function A() {
    }
    var proto_1 = A.prototype;
    proto_1.f1 = function () {
    };
    return A;
}());
