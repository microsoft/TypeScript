//// [tests/cases/compiler/unusedTypeParameterInMethod5.ts] ////

//// [unusedTypeParameterInMethod5.ts]
class A {
    public f1 = function<X>() {

    }
}

//// [unusedTypeParameterInMethod5.js]
class A {
    f1 = function () {
    };
}
