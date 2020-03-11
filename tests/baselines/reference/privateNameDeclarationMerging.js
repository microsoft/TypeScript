//// [privateNameDeclarationMerging.ts]
class D {};

class C {
    #x;
    foo () {
        const c = new C();
        c.#x;     // OK
        const d: D = new C();
        d.#x;    // Error
    }
}
interface C {
    new (): D;
}


//// [privateNameDeclarationMerging.js]
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
};
var _x;
class D {
}
;
class C {
    constructor() {
        _x.set(this, void 0);
    }
    foo() {
        const c = new C();
        __classPrivateFieldGet(c, _x); // OK
        const d = new C();
        __classPrivateFieldGet(d, _x); // Error
    }
}
_x = new WeakMap();
