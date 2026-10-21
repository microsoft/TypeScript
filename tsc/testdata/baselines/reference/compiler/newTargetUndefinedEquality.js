//// [tests/cases/compiler/newTargetUndefinedEquality.ts] ////

//// [newTargetUndefinedEquality.ts]
class ConstructorGuard {
    constructor() {
        if (new.target === undefined) throw TypeError("Constructor requires new");
    }
}


//// [newTargetUndefinedEquality.js]
"use strict";
class ConstructorGuard {
    constructor() {
        if (new.target === undefined)
            throw TypeError("Constructor requires new");
    }
}
