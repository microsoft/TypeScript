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
        this?.#b;           // Error
        this?.a.#b;         // Error
        this?.getA().#b;    // Error
    }
}
