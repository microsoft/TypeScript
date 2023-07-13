//// [tests/cases/compiler/compositeGenericFunction.ts] ////

//// [compositeGenericFunction.ts]
function f<T>(value: T) { return value; };

function h<R>(func: (x: number) => R): R { return null; }

var z: number = h<number>(f);
var z: number = h(f);

//// [compositeGenericFunction.js]
function f(value) { return value; }
;
function h(func) { return null; }
var z = h(f);
var z = h(f);
