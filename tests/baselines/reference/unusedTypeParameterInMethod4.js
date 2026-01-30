//// [tests/cases/compiler/unusedTypeParameterInMethod4.ts] ////

//// [unusedTypeParameterInMethod4.ts]
class A {
    public f1<X>() {

    }
}

//// [unusedTypeParameterInMethod4.js]
class A {
    f1() {
    }
}
