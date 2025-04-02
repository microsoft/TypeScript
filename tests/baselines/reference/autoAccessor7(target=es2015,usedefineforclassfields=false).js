//// [tests/cases/conformance/classes/propertyMemberDeclarations/autoAccessor7.ts] ////

//// [autoAccessor7.ts]
abstract class C1 {
    abstract accessor a: any;
}

class C2 extends C1 {
    accessor a = 1;
}

class C3 extends C1 {
    get a() { return 1; }
}


//// [autoAccessor7.js]
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
var _C2_a_accessor_storage;
class C1 {
}
class C2 extends C1 {
    constructor() {
        super(...arguments);
        _C2_a_accessor_storage.set(this, 1);
    }
    get a() { return __classPrivateFieldGet(this, _C2_a_accessor_storage, "f"); }
    set a(value) { __classPrivateFieldSet(this, _C2_a_accessor_storage, value, "f"); }
}
_C2_a_accessor_storage = new WeakMap();
class C3 extends C1 {
    get a() { return 1; }
}
