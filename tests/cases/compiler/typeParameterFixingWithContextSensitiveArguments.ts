function f<T, U>(y: T, f: (x: T) => U, x: T): [T, U] { return [y, f(x)]; }
interface A { a: A; }
interface B extends A { b; }

var a: A, b: B;

var d = f(b, x => x.a, a); // type [A, A]
var d2 = f(b, x => x.a, null); // type [B, A]
var d3 = f(b, x => x.b, null); // type [B, any]