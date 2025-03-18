//// [tests/cases/conformance/expressions/optionalChaining/privateIdentifierChain/privateIdentifierChain.1.ts] ////

//// [privateIdentifierChain.1.ts]
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


//// [privateIdentifierChain.1.js]
class A {
    a;
    #b;
    getA() {
        return new A();
    }
    constructor() {
        this?.#b;
        this?.a.#b;
        this?.getA().#b;
    }
}
