//// [tests/cases/compiler/inferringAnyFunctionType4.ts] ////

//// [inferringAnyFunctionType4.ts]
function f<T extends (p1: number) => number>(p: T): T {
    return p;
}

var v = f(x => x);

//// [inferringAnyFunctionType4.js]
function f(p) {
    return p;
}
var v = f(function (x) { return x; });
