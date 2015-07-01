//// [typeParameterFixingWithContextSensitiveArguments.ts]
function f<T, U>(y: T, f: (x: T) => U, x: T): [T, U] { return [y, f(x)]; }
interface A { a: A; }
interface B extends A { b; }

var a: A, b: B;

var d = f(b, x => x.a, a); // type [A, A]
var d2 = f(b, x => x.a, null); // type [B, A]
var d3 = f(b, x => x.b, null); // type [B, any]

//// [typeParameterFixingWithContextSensitiveArguments.js]
function f(y, f, x) { return [y, f(x)]; }
var a, b;
var d = f(b, function (x) { return x.a; }, a); // type [A, A]
var d2 = f(b, function (x) { return x.a; }, null); // type [B, A]
var d3 = f(b, function (x) { return x.b; }, null); // type [B, any]
