//// [tests/cases/compiler/unusedTypeParameterInLambda1.ts] ////

//// [unusedTypeParameterInLambda1.ts]
class A {
    public f1() {
        return <T>() => {

        }
    }
}

//// [unusedTypeParameterInLambda1.js]
var A = /** @class */ (function () {
    function A() {
    }
    A.prototype.f1 = function () {
        return function () {
        };
    };
    return A;
}());
