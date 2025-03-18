//// [tests/cases/conformance/classes/members/privateNames/privateNamesUnique-1.ts] ////

//// [privateNamesUnique-1.ts]
class A {
    #foo: number;
}

class B {
    #foo: number;
}

const b: A = new B();     // Error: Property #foo is missing


//// [privateNamesUnique-1.js]
class A {
    #foo;
}
class B {
    #foo;
}
const b = new B();
