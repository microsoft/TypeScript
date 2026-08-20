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
class Abc {
    constructor() {
        this.def = true;
    }
}
