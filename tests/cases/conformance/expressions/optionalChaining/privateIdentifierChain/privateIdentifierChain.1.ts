// @strict: true
// @target: esnext,es2015
// @useDefineForClassFields: false

class A {
    a?: A
    #b?: A;
    getA(): A {
        return new A();
    }
    constructor() {
        this.a = this;
        // None of these should error
        this?.#b;
        this?.a.#b;
        this?.getA().#b;
    }
}

class B {
    a?: A
    getA(): A {
        return new A();
    }
    constructor() {
        this.a = new A();
        this.a?.#b; // Error
        this?.a.#b; // Error
        this?.getA().#b; // Error
    }
}
