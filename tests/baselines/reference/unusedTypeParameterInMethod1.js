//// [tests/cases/compiler/unusedTypeParameterInMethod1.ts] ////

//// [unusedTypeParameterInMethod1.ts]
class A {
    public f1<X, Y, Z>() {
        var a: Y;
        var b: Z;
        a;
        b;
    }
}

//// [unusedTypeParameterInMethod1.js]
class A {
    f1() {
        var a;
        var b;
        a;
        b;
    }
}
