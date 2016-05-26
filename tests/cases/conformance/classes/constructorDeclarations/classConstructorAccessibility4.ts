// @declaration: true

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