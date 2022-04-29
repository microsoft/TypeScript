class A { public foo() { } }
class B { public bar() { } }

interface I<T extends A, T extends B> {}