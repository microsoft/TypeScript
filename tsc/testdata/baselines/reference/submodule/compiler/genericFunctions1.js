//// [tests/cases/compiler/genericFunctions1.ts] ////

//// [genericFunctions1.ts]
function foo<T > (x: T) { return x; }

var x = foo(5); // 'x' should be number

//// [genericFunctions1.js]
function foo(x) { return x; }
var x = foo(5); // 'x' should be number


//// [genericFunctions1.d.ts]
declare function foo<T>(x: T): T;
declare var x: number;
