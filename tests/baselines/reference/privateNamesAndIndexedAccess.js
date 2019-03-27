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
var _bar, _bar_1;
class C {
    constructor() {
        this.foo = 3;
        _bar_1.set(this, 3);
        _bar_1.set(this, void 0);
        // will never use this syntax, already taken:
        this.badAlways = 3; // Error
        const ok = 3;
        // not supported yet, could support in future:
        const badForNow;
    }
}
_bar = new WeakMap(), _bar_1 = new WeakMap();
