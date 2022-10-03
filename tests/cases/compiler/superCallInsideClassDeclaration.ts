class A {
}

class C {
}

class B extends A {
    constructor() {

        class D extends C {
            constructor() {
                super();
            }
        }
    }
}