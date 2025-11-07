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
    def;
    constructor() {
        this.def = true;
    }
}
