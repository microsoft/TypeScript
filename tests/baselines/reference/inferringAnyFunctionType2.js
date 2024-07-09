//// [tests/cases/compiler/inferringAnyFunctionType2.ts] ////

//// [inferringAnyFunctionType2.ts]
function f<T extends [(p1: number) => number]>(p: T): T {
    return p;
}

var v = f([x => x]);

//// [inferringAnyFunctionType2.js]
function f(p) {
    return p;
}
var v = f([function (x) { return x; }]);
