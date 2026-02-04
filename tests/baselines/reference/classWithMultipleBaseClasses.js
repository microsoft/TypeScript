//// [tests/cases/compiler/classWithMultipleBaseClasses.ts] ////

//// [classWithMultipleBaseClasses.ts]
class A {
    foo() { }
}

class B {
    bar() { }
}

interface I {
    baz();
}

interface J {
    bat();
}


class D implements I, J {
    baz() { }
    bat() { }
}

interface I extends A, B {
}

//// [classWithMultipleBaseClasses.js]
class A {
    foo() { }
}
class B {
    bar() { }
}
class D {
    baz() { }
    bat() { }
}
