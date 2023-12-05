//// [tests/cases/compiler/unusedTypeParameterInMethod5.ts] ////

//// [unusedTypeParameterInMethod5.ts]
class A {
    public f1 = function<X>() {

    }
}

//// [unusedTypeParameterInMethod5.js]
var A = /** @class */ (function () {
    function A() {
        this.f1 = function () {
        };
    }
    return A;
}());
