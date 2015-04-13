//// [typeParameterFixingWithContextSensitiveArguments5.ts]
function f<T, U>(t1: T, u1: U, pf1: (u2: U) => T, pf2: (t2: T) => U): [T, U] { return [t1, pf2(t1)]; }
interface A { a: A; }
interface B extends A { b: any; }

var a: A, b: B;

var d = f(a, b, u2 => u2.b, t2 => t2);

//// [typeParameterFixingWithContextSensitiveArguments5.js]
function f(t1, u1, pf1, pf2) { return [t1, pf2(t1)]; }
var a, b;
var d = f(a, b, function (u2) { return u2.b; }, function (t2) { return t2; });
