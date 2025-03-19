//// [tests/cases/compiler/generics3.ts] ////

//// [generics3.ts]
class C<T> { private x: T; }
interface X { f(): string; }
interface Y { f(): string; }
var a: C<X>;
var b: C<Y>;

a = b; // Ok - should be identical

//// [generics3.js]
class C {
    x;
}
var a;
var b;
a = b; // Ok - should be identical
