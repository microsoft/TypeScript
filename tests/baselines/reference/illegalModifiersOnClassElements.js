//// [tests/cases/compiler/illegalModifiersOnClassElements.ts] ////

//// [illegalModifiersOnClassElements.ts]
class C {
    declare foo = 1;
    export bar = 1;
}

//// [illegalModifiersOnClassElements.js]
"use strict";
class C {
    constructor() {
        this.bar = 1;
    }
}
