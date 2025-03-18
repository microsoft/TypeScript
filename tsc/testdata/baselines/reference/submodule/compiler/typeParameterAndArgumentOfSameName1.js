//// [tests/cases/compiler/typeParameterAndArgumentOfSameName1.ts] ////

//// [typeParameterAndArgumentOfSameName1.ts]
function f<A extends Number>(A: A): A {
    var r = A.toExponential(123);
    return null;
}

//// [typeParameterAndArgumentOfSameName1.js]
function f(A) {
    var r = A.toExponential(123);
    return null;
}
