//// [tests/cases/compiler/strictBooleanMemberAssignability.ts] ////

//// [strictBooleanMemberAssignability.ts]
class Abc {
    def: boolean
    constructor() {
        this.def = true
    }
}

//// [strictBooleanMemberAssignability.js]
class Abc {
    def;
    constructor() {
        this.def = true;
    }
}
