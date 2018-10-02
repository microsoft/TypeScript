// @strictClassTypes: true

class A {}
class B extends A {}
class C extends A {
    x: number;
}
interface I {
    x: number;
}

declare let a: A;
declare let b: B;
declare let c: C;
declare let i: I;

a = b; // Ok
b = a; // Error

i = c; // Ok
c = i; // Error
