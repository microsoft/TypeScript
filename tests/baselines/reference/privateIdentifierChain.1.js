//// [privateIdentifierChain.1.ts]
class A {
    a?: A
    #b?: A;
    getA(): A {
        return new A();
    }
    constructor() {
        this?.#b;
        this?.a.#b;         // Error
        this?.getA().#b;
    }
}


//// [privateIdentifierChain.1.js]
"use strict";
class A {
    constructor() {
        this?.#b;
        this?.a.#b; // Error
        this?.getA().#b;
    }
    #b;
    getA() {
        return new A();
    }
}
