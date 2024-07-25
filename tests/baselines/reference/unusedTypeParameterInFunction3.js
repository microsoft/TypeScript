//// [tests/cases/compiler/unusedTypeParameterInFunction3.ts] ////

//// [unusedTypeParameterInFunction3.ts]
function f1<X, Y, Z>() {
    var a: X;
    var b: Z;
    a;
    b;
}

//// [unusedTypeParameterInFunction3.js]
function f1() {
    var a;
    var b;
    a;
    b;
}
