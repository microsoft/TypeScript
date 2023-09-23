//// [tests/cases/compiler/typeParameterFixingWithContextSensitiveArguments2.ts] ////

//// [typeParameterFixingWithContextSensitiveArguments2.ts]
function f<T, U>(y: T, y1: U, p: (z: U) => T, p1: (x: T) => U): [T, U] { return [y, p1(y)]; }
interface A { a: A; }
interface B extends A { b; }

var a: A, b: B;

var d = f(a, b, x => x, x => x); // A => A not assignable to A => B

//// [typeParameterFixingWithContextSensitiveArguments2.js]
function f(y, y1, p, p1) { return [y, p1(y)]; }
var a, b;
var d = f(a, b, function (x) { return x; }, function (x) { return x; }); // A => A not assignable to A => B
