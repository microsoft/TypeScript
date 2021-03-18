//// [privateNameConstructorSignature.ts]
interface D {
    x: number;
}
class C {
    #x;
    static test() {
        new C().#x = 10;
        const y = new C();
        const z = new y();
        z.x = 123;
    }
}
interface C {
    new (): D;
}



//// [privateNameConstructorSignature.js]
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var _C_x;
class C {
    constructor() {
        _C_x.set(this, void 0);
    }
    static test() {
        __classPrivateFieldSet(new C(), _C_x, 10, "f");
        const y = new C();
        const z = new y();
        z.x = 123;
    }
}
_C_x = new WeakMap();
