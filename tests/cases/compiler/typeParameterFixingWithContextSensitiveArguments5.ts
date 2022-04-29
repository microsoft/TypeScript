function f<T, U>(t1: T, u1: U, pf1: (u2: U) => T, pf2: (t2: T) => U): [T, U] { return [t1, pf2(t1)]; }
interface A { a: A; }
interface B extends A { b: any; }

var a: A, b: B;

var d = f(a, b, u2 => u2.b, t2 => t2);