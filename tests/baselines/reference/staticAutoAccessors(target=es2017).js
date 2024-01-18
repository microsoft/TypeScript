//// [tests/cases/conformance/classes/propertyMemberDeclarations/staticAutoAccessors.ts] ////

//// [staticAutoAccessors.ts]
// https://github.com/microsoft/TypeScript/issues/53752

class A {
    // uses class reference
    static accessor x = 1;

    // uses 'this'
    accessor y = 2;
}



//// [staticAutoAccessors.js]
// https://github.com/microsoft/TypeScript/issues/53752
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var _a, _A_x_accessor_storage, _A_y_accessor_storage;
class A {
    constructor() {
        _A_y_accessor_storage.set(this, 2);
    }
    // uses class reference
    static get x() { return __classPrivateFieldGet(_a, _a, "f", _A_x_accessor_storage); }
    static set x(value) { __classPrivateFieldSet(_a, _a, value, "f", _A_x_accessor_storage); }
    // uses 'this'
    get y() { return __classPrivateFieldGet(this, _A_y_accessor_storage, "f"); }
    set y(value) { __classPrivateFieldSet(this, _A_y_accessor_storage, value, "f"); }
}
_a = A, _A_y_accessor_storage = new WeakMap();
_A_x_accessor_storage = { value: 1 };
