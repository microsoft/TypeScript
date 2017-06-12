//// [unusedTypeParameterInLambda2.ts]
class A {
    public f1() {
        return <T, X>() => {
            var a: X;
            a;
        }
    }
}

//// [unusedTypeParameterInLambda2.js]
var A = (function () {
    function A() {
    }
    var proto_1 = A.prototype;
    proto_1.f1 = function () {
        return function () {
            var a;
            a;
        };
    };
    return A;
}());
