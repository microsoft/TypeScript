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


//// [declFileForClassWithMultipleBaseClasses.d.ts]
declare class A {
    foo(): void;
}
declare class B {
    bar(): void;
}
interface I {
    baz(): any;
}
interface J {
    bat(): any;
}
declare class D implements I, J {
    baz(): void;
    bat(): void;
    foo(): void;
    bar(): void;
}
interface I extends A, B {
}
