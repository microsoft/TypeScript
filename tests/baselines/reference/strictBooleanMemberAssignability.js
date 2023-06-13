//// [tests/cases/compiler/strictBooleanMemberAssignability.ts] ////

//// [strictBooleanMemberAssignability.ts]
class Abc {
    def: boolean
    constructor() {
        this.def = true
    }
}

//// [strictBooleanMemberAssignability.js]
"use strict";
var Abc = /** @class */ (function () {
    function Abc() {
        this.def = true;
    }
    return Abc;
}());
