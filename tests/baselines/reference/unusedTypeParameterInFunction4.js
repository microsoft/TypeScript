//// [unusedTypeParameterInFunction4.ts]
function f1<X, Y, Z>() {
    var a: Y;
    var b: Z;
    a;
    b;
}

//// [unusedTypeParameterInFunction4.js]
function f1() {
    var a;
    var b;
    a;
    b;
}
