//// [tests/cases/compiler/unusedTypeParameterInLambda2.ts] ////

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
var A = /** @class */ (function () {
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
