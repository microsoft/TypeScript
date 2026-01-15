class A { }
class B extends A { x: number; }

declare function f(p: A, q: B): number;
declare function f(p: B, q: A): string;

var x: B;
var t: number = f(x, x); // Not an error