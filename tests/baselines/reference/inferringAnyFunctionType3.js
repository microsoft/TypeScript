//// [tests/cases/compiler/inferringAnyFunctionType3.ts] ////

//// [inferringAnyFunctionType3.ts]
function f<T extends ((p1: number) => number)[]>(p: T): T {
    return p;
}

var v = f([x => x]);

//// [inferringAnyFunctionType3.js]
"use strict";
function f(p) {
    return p;
}
var v = f([x => x]);
