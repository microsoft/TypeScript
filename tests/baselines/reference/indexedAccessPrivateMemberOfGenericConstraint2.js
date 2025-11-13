//// [tests/cases/compiler/indexedAccessPrivateMemberOfGenericConstraint2.ts] ////

//// [indexedAccessPrivateMemberOfGenericConstraint2.ts]
class A {
  declare private a: { foo: number };
}

class B {
  declare private a: { bar: string };
}

type X<T extends A> = [T["a"], (T | B)["a"]];
type Y<T extends A | B> = T["a"];
type Z<T extends A & B> = T["a"];
type R<T extends A, T2 extends B> = (T | T2)["a"];
type S<T extends B, T2 extends A> = (T | T2)["a"];
type U<T extends A> = (T & B)["a"];
type V<T extends A, T2 extends B> = (T & T2)["a"];
type W<T extends B, T2 extends A> = (T & T2)["a"];

class C {
  declare private a: { foo: number };
}

class D {
  declare a: { bar: string };
}

type X2<T extends C> = [T["a"], (T | D)["a"]];
type Y2<T extends C | D> = T["a"];
type Z2<T extends C & D> = T["a"];
type R2<T extends C, T2 extends D> = (T | T2)["a"];
type S2<T extends D, T2 extends C> = (T | T2)["a"];
type U2<T extends C> = (T & D)["a"];
type V2<T extends C, T2 extends D> = (T & T2)["a"];
type W2<T extends D, T2 extends C> = (T & T2)["a"];

class E {
  declare a: { foo: number };
}

class F {
  declare private a: { bar: string };
}

type X3<T extends E> = [T["a"], (T | F)["a"]];
type Y3<T extends E | F> = T["a"];
type Z3<T extends E & F> = T["a"];
type R3<T extends E, T2 extends F> = (T | T2)["a"];
type S3<T extends F, T2 extends E> = (T | T2)["a"];
type U3<T extends E> = (T & F)["a"];
type V3<T extends E, T2 extends F> = (T & T2)["a"];
type W3<T extends F, T2 extends E> = (T & T2)["a"];

class G {
  declare b: { foo: number };
}

class H {
  declare private a: { bar: string };
}

type X4<T extends G> = [T["a"], (T | H)["a"]];
type Y4<T extends G | H> = T["a"];
type Z4<T extends G & H> = T["a"];
type R4<T extends G, T2 extends H> = (T | T2)["a"];
type S4<T extends H, T2 extends G> = (T | T2)["a"];
type U4<T extends G> = (T & H)["a"];
type V4<T extends G, T2 extends H> = (T & T2)["a"];
type W4<T extends H, T2 extends G> = (T & T2)["a"];


//// [indexedAccessPrivateMemberOfGenericConstraint2.js]
var A = /** @class */ (function () {
    function A() {
    }
    return A;
}());
var B = /** @class */ (function () {
    function B() {
    }
    return B;
}());
var C = /** @class */ (function () {
    function C() {
    }
    return C;
}());
var D = /** @class */ (function () {
    function D() {
    }
    return D;
}());
var E = /** @class */ (function () {
    function E() {
    }
    return E;
}());
var F = /** @class */ (function () {
    function F() {
    }
    return F;
}());
var G = /** @class */ (function () {
    function G() {
    }
    return G;
}());
var H = /** @class */ (function () {
    function H() {
    }
    return H;
}());
