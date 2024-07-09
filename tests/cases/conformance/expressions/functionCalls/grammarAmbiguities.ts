function f(n: any) { return null; }
function g<A, B>(x: any) { return null; }
interface A { }
interface B { }
var A, B;

f(g<A, B>(7));
f(g < A, B > 7); // Should error
f(g < A, B > +(7)); // Should error

