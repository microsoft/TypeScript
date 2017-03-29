//// [unusedParametersInLambda1.ts]
class A {
    public f1() {
        return (X) => {
        }
    }
}

//// [unusedParametersInLambda1.js]
var A = (function () {
    function A() {
    }
    A.prototype.f1 = function () {
        return function (X) {
        };
    };
    return A;
}());
