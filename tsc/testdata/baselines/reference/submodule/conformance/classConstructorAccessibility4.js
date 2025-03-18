//// [tests/cases/conformance/classes/constructorDeclarations/classConstructorAccessibility4.ts] ////

//// [classConstructorAccessibility4.ts]
class A {
    private constructor() { }

    method() {
        class B {
            method() {
                new A(); // OK
            }
        }

        class C extends A { // OK
        }
    }
}

class D {
    protected constructor() { }

    method() {
        class E {
            method() {
                new D(); // OK
            }
        }

        class F extends D { // OK
        }
    }
}

//// [classConstructorAccessibility4.js]
class A {
    constructor() { }
    method() {
        class B {
            method() {
                new A();
            }
        }
        class C extends A {
        }
    }
}
class D {
    constructor() { }
    method() {
        class E {
            method() {
                new D();
            }
        }
        class F extends D {
        }
    }
}
