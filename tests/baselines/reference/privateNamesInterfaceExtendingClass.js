//// [tests/cases/conformance/classes/members/privateNames/privateNamesInterfaceExtendingClass.ts] ////

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
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var _C_prop;
class C {
    constructor() {
        _C_prop.set(this, void 0);
    }
    func(x) {
        __classPrivateFieldSet(x, _C_prop, 123, "f");
    }
}
_C_prop = new WeakMap();
function func(x) {
    x. = 123;
}
