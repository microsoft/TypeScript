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
    A.prototype.f1 = function () {
        return function () {
            var a;
            a;
        };
    };
    return A;
}());
