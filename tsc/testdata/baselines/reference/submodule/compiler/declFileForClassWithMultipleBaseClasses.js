//// [tests/cases/compiler/declFileForClassWithMultipleBaseClasses.ts] ////

//// [declFileForClassWithMultipleBaseClasses.ts]
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
    foo() { }
    bar() { }
}

interface I extends A, B {
}

//// [declFileForClassWithMultipleBaseClasses.js]
class A {
    foo() { }
}
class B {
    bar() { }
}
class D {
    baz() { }
    bat() { }
    foo() { }
    bar() { }
}
