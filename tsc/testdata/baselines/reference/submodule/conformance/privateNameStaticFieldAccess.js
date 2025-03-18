//// [tests/cases/conformance/classes/members/privateNames/privateNameStaticFieldAccess.ts] ////

//// [privateNameStaticFieldAccess.ts]
class A {
    static #myField = "hello world";
    constructor() {
        console.log(A.#myField); //Ok
        console.log(this.#myField); //Error
    }
}


//// [privateNameStaticFieldAccess.js]
class A {
    static #myField = "hello world";
    constructor() {
        console.log(A.#myField);
        console.log(this.#myField);
    }
}
