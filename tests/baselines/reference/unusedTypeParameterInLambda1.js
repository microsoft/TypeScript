//// [unusedTypeParameterInLambda1.ts]
class A {
    public f1() {
        return <T>() => {

        }
    }
}

//// [unusedTypeParameterInLambda1.js]
var A = (function () {
    function A() {
    }
    A.prototype.f1 = function () {
        return function () {
        };
    };
    return A;
}());
