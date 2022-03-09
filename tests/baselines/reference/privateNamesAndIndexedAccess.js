//// [privateNamesAndIndexedAccess.ts]
class C {
    foo = 3;
    #bar = 3;
    constructor () {
        const ok: C["foo"] = 3;
        // not supported yet, could support in future:
        const badForNow: C[#bar] = 3;   // Error
        // will never use this syntax, already taken:
        const badAlways: C["#bar"] = 3; // Error
    }
}


//// [privateNamesAndIndexedAccess.js]
"use strict";
var _C_bar;
class C {
    constructor() {
        this.foo = 3;
        _C_bar.set(this, 3);
        const ok = 3;
        // not supported yet, could support in future:
        const badForNow, #bar;
        3; // Error
        // will never use this syntax, already taken:
        const badAlways = 3; // Error
    }
}
_C_bar = new WeakMap();
