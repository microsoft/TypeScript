//// [unusedParametersInLambda3.ts]

class A {
    public f1() {
        return (X, Y, Z) => {
            Y;
        }
    }
}

//// [unusedParametersInLambda3.js]
var A = (function () {
    function A() {
    }
    A.prototype.f1 = function () {
        return function (X, Y, Z) {
            Y;
        };
    };
    return A;
}());
