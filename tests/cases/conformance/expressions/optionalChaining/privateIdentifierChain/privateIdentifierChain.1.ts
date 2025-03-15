// @strict: true
// @target: esnext
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
