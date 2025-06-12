//// [tests/cases/compiler/staticInstanceResolution4.ts] ////

//// [staticInstanceResolution4.ts]
class A {
   public foo() {}
}

A.foo();

//// [staticInstanceResolution4.js]
class A {
    foo() { }
}
A.foo();
