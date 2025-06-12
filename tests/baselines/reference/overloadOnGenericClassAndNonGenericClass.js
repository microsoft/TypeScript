//// [tests/cases/compiler/overloadOnGenericClassAndNonGenericClass.ts] ////

//// [overloadOnGenericClassAndNonGenericClass.ts]
class A { a; }
class B { b; }
class C { c; }
class X<T> { x: T; }
class X1 { x: string; }
class X2 { x: string; }
function f(a: X1): A;
function f<T>(a: X<T>): B;
function f(a): any {
}

var xs: X<string>;

var t3 = f(xs);
var t3: A; // should not error


//// [overloadOnGenericClassAndNonGenericClass.js]
class A {
}
class B {
}
class C {
}
class X {
}
class X1 {
}
class X2 {
}
function f(a) {
}
var xs;
var t3 = f(xs);
var t3; // should not error
