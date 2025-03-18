//// [tests/cases/compiler/noImplicitAnyFunctionExpressionAssignment.ts] ////

//// [noImplicitAnyFunctionExpressionAssignment.ts]
var x: (a: any) => void = function <T>(x: T) {
    return null;
};

var x2: (a: any) => void = function f<T>(x: T) {
    return null;
};

//// [noImplicitAnyFunctionExpressionAssignment.js]
var x = function (x) {
    return null;
};
var x2 = function f(x) {
    return null;
};
