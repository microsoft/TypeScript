//// [tests/cases/conformance/classes/propertyMemberDeclarations/autoAccessor2.ts] ////

//// [autoAccessor2.ts]
class C1 {
    accessor #a: any;
    accessor #b = 1;
    static accessor #c: any;
    static accessor #d = 2;

    constructor() {
        this.#a = 3;
        this.#b = 4;
    }

    static {
        this.#c = 5;
        this.#d = 6;
    }
}


//// [autoAccessor2.js]
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
var _C1_instances, _a, _C1_a_get, _C1_a_set, _C1_b_get, _C1_b_set, _C1_c_get, _C1_c_set, _C1_d_get, _C1_d_set, _C1_a_accessor_storage, _C1_b_accessor_storage, _C1_c_accessor_storage, _C1_d_accessor_storage;
class C1 {
    constructor() {
        _C1_instances.add(this);
        _C1_a_accessor_storage.set(this, void 0);
        _C1_b_accessor_storage.set(this, 1);
        __classPrivateFieldSet(this, _C1_instances, 3, "a", _C1_a_set);
        __classPrivateFieldSet(this, _C1_instances, 4, "a", _C1_b_set);
    }
}
_a = C1, _C1_instances = new WeakSet(), _C1_a_accessor_storage = new WeakMap(), _C1_b_accessor_storage = new WeakMap(), _C1_a_get = function _C1_a_get() { return __classPrivateFieldGet(this, _C1_a_accessor_storage, "f"); }, _C1_a_set = function _C1_a_set(value) { __classPrivateFieldSet(this, _C1_a_accessor_storage, value, "f"); }, _C1_b_get = function _C1_b_get() { return __classPrivateFieldGet(this, _C1_b_accessor_storage, "f"); }, _C1_b_set = function _C1_b_set(value) { __classPrivateFieldSet(this, _C1_b_accessor_storage, value, "f"); }, _C1_c_get = function _C1_c_get() { return __classPrivateFieldGet(_a, _a, "f", _C1_c_accessor_storage); }, _C1_c_set = function _C1_c_set(value) { __classPrivateFieldSet(_a, _a, value, "f", _C1_c_accessor_storage); }, _C1_d_get = function _C1_d_get() { return __classPrivateFieldGet(_a, _a, "f", _C1_d_accessor_storage); }, _C1_d_set = function _C1_d_set(value) { __classPrivateFieldSet(_a, _a, value, "f", _C1_d_accessor_storage); };
_C1_c_accessor_storage = { value: void 0 };
_C1_d_accessor_storage = { value: 2 };
(() => {
    __classPrivateFieldSet(_a, _a, 5, "a", _C1_c_set);
    __classPrivateFieldSet(_a, _a, 6, "a", _C1_d_set);
})();
