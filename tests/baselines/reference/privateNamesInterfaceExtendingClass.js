//// [privateNamesInterfaceExtendingClass.ts]
class C {
    #prop;
    func(x: I) {
        x.#prop = 123;
    }
}
interface I extends C {}

function func(x: I) {
    x.#prop = 123;
}



//// [privateNamesInterfaceExtendingClass.js]
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
};
var _prop;
class C {
    constructor() {
        _prop.set(this, void 0);
    }
    func(x) {
        __classPrivateFieldSet(x, _prop, 123);
    }
}
_prop = new WeakMap();
function func(x) {
    x. = 123;
}
