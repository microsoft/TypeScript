//// [tests/cases/compiler/unusedSingleParameterInContructor.ts] ////

//// [unusedSingleParameterInContructor.ts]
class Dummy {
    constructor(person: string) {
        var unused = 20;
    }
}

//// [unusedSingleParameterInContructor.js]
"use strict";
var Dummy = /** @class */ (function () {
    function Dummy(person) {
        var unused = 20;
    }
    return Dummy;
}());
