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
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _C_x;
class D {
}
;
class C {
    constructor() {
        _C_x.set(this, void 0);
    }
    foo() {
        const c = new C();
        __classPrivateFieldGet(c, _C_x, "f"); // OK
        const d = new C();
        __classPrivateFieldGet(d, _C_x, "f"); // Error
    }
}
_C_x = new WeakMap();
