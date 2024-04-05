//// [tests/cases/compiler/unusedParametersInLambda2.ts] ////

//// [unusedParametersInLambda2.ts]
class A {
    public f1() {
        return (X, Y) => {
            Y;
        }
    }
}

//// [unusedParametersInLambda2.js]
var A = /** @class */ (function () {
    function A() {
    }
    A.prototype.f1 = function () {
        return function (X, Y) {
            Y;
        };
    };
    return A;
}());
