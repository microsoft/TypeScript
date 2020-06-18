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
var _x;
class C {
    constructor() {
        _x.set(this, void 0);
    }
    static test() {
        __classPrivateFieldSet(new C(), _x, 10);
        const y = new C();
        const z = new y();
        z.x = 123;
    }
}
_x = new WeakMap();
