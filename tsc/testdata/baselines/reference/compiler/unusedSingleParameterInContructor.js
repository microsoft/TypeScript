//// [tests/cases/compiler/unusedSingleParameterInContructor.ts] ////

//// [unusedSingleParameterInContructor.ts]
class Dummy {
    constructor(person: string) {
        var unused = 20;
    }
}

//// [unusedSingleParameterInContructor.js]
"use strict";
class Dummy {
    constructor(person) {
        var unused = 20;
    }
}
