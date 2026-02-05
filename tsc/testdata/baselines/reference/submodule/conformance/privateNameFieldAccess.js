//// [tests/cases/conformance/classes/members/privateNames/privateNameFieldAccess.ts] ////

//// [privateNameFieldAccess.ts]
class A {
    #myField = "hello world";
    constructor() {
        console.log(this.#myField);
    }
}


//// [privateNameFieldAccess.js]
"use strict";
class A {
    #myField = "hello world";
    constructor() {
        console.log(this.#myField);
    }
}
