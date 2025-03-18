//// [tests/cases/compiler/classImplementsClass7.ts] ////

//// [classImplementsClass7.ts]
class A {
    private x: number;
}

class B implements A {}


//// [classImplementsClass7.js]
class A {
    x;
}
class B {
}
