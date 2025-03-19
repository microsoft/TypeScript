//// [tests/cases/conformance/classes/members/privateNames/privateNamesUnique-5.ts] ////

//// [privateNamesUnique-5.ts]
// same as privateNamesUnique-1, but with an interface

class A {
    #foo: number;
}
interface A2 extends A { }

class B {
    #foo: number;
}

const b: A2 = new B();


//// [privateNamesUnique-5.js]
// same as privateNamesUnique-1, but with an interface
class A {
    #foo;
}
class B {
    #foo;
}
const b = new B();
