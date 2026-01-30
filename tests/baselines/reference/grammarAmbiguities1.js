//// [tests/cases/compiler/grammarAmbiguities1.ts] ////

//// [grammarAmbiguities1.ts]
class A { foo() { } }
class B { bar() { }}
function f(x) { return x; }
function g<T, U>(x) { return f(x); }
g<A, B>(7)

f(g<A, B>(7));
f(g < A, B > 7);
f(g < A, B > +(7));


//// [grammarAmbiguities1.js]
class A {
    foo() { }
}
class B {
    bar() { }
}
function f(x) { return x; }
function g(x) { return f(x); }
g(7);
f(g(7));
f(g < A, B > 7);
f(g < A, B > +(7));
