// @target: es2015
function f<A extends Number>(A: A): A {
    var r = A.toExponential(123);
    return null;
}