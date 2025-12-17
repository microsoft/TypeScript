//// [tests/cases/conformance/expressions/optionalChaining/privateIdentifierChain/privateIdentifierChain.1.ts] ////

//// [privateIdentifierChain.1.ts]
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


//// [privateIdentifierChain.1.js]
"use strict";
class A {
    #b;
    getA() {
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
    getA() {
        return new A();
    }
    constructor() {
        this.a = new A();
        this.a?.#b; // Error
        this?.a.#b; // Error
        this?.getA().#b; // Error
    }
}
