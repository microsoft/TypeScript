//// [unusedTypeParameterInFunction2.ts]
function f1<X, Y>() {
    var a: X;
    a;
}

//// [unusedTypeParameterInFunction2.js]
function f1() {
    var a;
    a;
}
