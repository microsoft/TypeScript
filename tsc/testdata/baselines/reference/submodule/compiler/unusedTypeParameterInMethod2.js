//// [tests/cases/compiler/unusedTypeParameterInMethod2.ts] ////

//// [unusedTypeParameterInMethod2.ts]
class A {
    public f1<X, Y, Z>() {
        var a: X;
        var b: Z;
        a;
        b;
    }
}

//// [unusedTypeParameterInMethod2.js]
class A {
    f1() {
        var a;
        var b;
        a;
        b;
    }
}
