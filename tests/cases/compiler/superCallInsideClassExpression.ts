class A {
}

class C {
}

class B extends A {
    constructor() {

        var D = class extends C {
            constructor() {
                super();
            }
        }
    }
}