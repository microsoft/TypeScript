//// [tests/cases/compiler/invalidStaticField.ts] ////

//// [invalidStaticField.ts]
class A { foo() { return B.NULL; } }
class B { static NOT_NULL = new B(); }

//// [invalidStaticField.js]
class A {
    foo() { return B.NULL; }
}
class B {
    static NOT_NULL = new B();
}
