//// [tests/cases/conformance/classes/propertyMemberDeclarations/autoAccessor6.ts] ////

//// [autoAccessor6.ts]
class C1 {
    accessor a: any;
}

class C2 extends C1 {
    a = 1;
}

class C3 extends C1 {
    get a() { return super.a; }
}


//// [autoAccessor6.js]
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
var _C1_a_accessor_storage;
class C1 {
    constructor() {
        _C1_a_accessor_storage.set(this, void 0);
    }
    get a() { return __classPrivateFieldGet(this, _C1_a_accessor_storage, "f"); }
    set a(value) { __classPrivateFieldSet(this, _C1_a_accessor_storage, value, "f"); }
}
_C1_a_accessor_storage = new WeakMap();
class C2 extends C1 {
    constructor() {
        super(...arguments);
        Object.defineProperty(this, "a", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 1
        });
    }
}
class C3 extends C1 {
    get a() { return super.a; }
}
