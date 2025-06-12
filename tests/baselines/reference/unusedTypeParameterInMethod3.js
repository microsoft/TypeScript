//// [tests/cases/compiler/unusedTypeParameterInMethod3.ts] ////

//// [unusedTypeParameterInMethod3.ts]
class A {
    public f1<X, Y, Z>() {
        var a: X;
        var b: Y;
        a;
        b;
    }
}

//// [unusedTypeParameterInMethod3.js]
class A {
    f1() {
        var a;
        var b;
        a;
        b;
    }
}
