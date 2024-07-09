//// [tests/cases/compiler/genericParameterAssignability1.ts] ////

//// [genericParameterAssignability1.ts]
function f<T>(x: T): T { return null; }
var r = <T>(x: T) => x;
r = f; // should be allowed

//// [genericParameterAssignability1.js]
function f(x) { return null; }
var r = function (x) { return x; };
r = f; // should be allowed
