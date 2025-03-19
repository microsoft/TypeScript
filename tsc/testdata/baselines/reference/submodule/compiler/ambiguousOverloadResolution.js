//// [tests/cases/compiler/ambiguousOverloadResolution.ts] ////

//// [ambiguousOverloadResolution.ts]
class A { }
class B extends A { x: number; }

declare function f(p: A, q: B): number;
declare function f(p: B, q: A): string;

var x: B;
var t: number = f(x, x); // Not an error

//// [ambiguousOverloadResolution.js]
class A {
}
class B extends A {
    x;
}
var x;
var t = f(x, x); // Not an error
