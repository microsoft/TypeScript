//// [tests/cases/conformance/classes/members/privateNames/privateNamesNoDelete.ts] ////

//// [privateNamesNoDelete.ts]
class A {
    #v = 1;
    constructor() {
        delete this.#v; // Error: The operand of a delete operator cannot be a private name.
    }
}


//// [privateNamesNoDelete.js]
"use strict";
class A {
    #v = 1;
    constructor() {
        delete this.#v; // Error: The operand of a delete operator cannot be a private name.
    }
}
