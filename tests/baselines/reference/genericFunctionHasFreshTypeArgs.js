//// [tests/cases/compiler/genericFunctionHasFreshTypeArgs.ts] ////

//// [genericFunctionHasFreshTypeArgs.ts]
function f(p: <T>(x: T) => void) { };
f(x => f(y => x = y));

//// [genericFunctionHasFreshTypeArgs.js]
function f(p) { }
;
f(function (x) { return f(function (y) { return x = y; }); });
