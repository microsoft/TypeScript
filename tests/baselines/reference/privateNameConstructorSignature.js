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
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
};
var _C_x;
class C {
    constructor() {
        _C_x.set(this, void 0);
    }
    static test() {
        __classPrivateFieldSet(new C(), _C_x, 10);
        const y = new C();
        const z = new y();
        z.x = 123;
    }
}
_C_x = new WeakMap();
