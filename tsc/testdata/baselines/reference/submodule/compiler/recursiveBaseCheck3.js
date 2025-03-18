//// [tests/cases/compiler/recursiveBaseCheck3.ts] ////

//// [recursiveBaseCheck3.ts]
class A<T> extends C<T> { }
class C<T> extends A<T> { }

(new C).blah;

//// [recursiveBaseCheck3.js]
class A extends C {
}
class C extends A {
}
(new C).blah;
