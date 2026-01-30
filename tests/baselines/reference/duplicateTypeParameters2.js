//// [tests/cases/compiler/duplicateTypeParameters2.ts] ////

//// [duplicateTypeParameters2.ts]
class A { public foo() { } }
class B { public bar() { } }

interface I<T extends A, T extends B> {}

//// [duplicateTypeParameters2.js]
class A {
    foo() { }
}
class B {
    bar() { }
}
