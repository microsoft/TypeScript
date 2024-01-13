//// [tests/cases/conformance/classes/propertyMemberDeclarations/autoAccessor4.ts] ////

//// [autoAccessor4.ts]
class C1 {
    accessor 0: any;
    accessor 1 = 1;
    static accessor 2: any;
    static accessor 3 = 2;
}


//// [autoAccessor4.js]
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
var _a, _C1__a_accessor_storage, _C1__b_accessor_storage, _C1__c_accessor_storage, _C1__d_accessor_storage;
class C1 {
    constructor() {
        _C1__a_accessor_storage.set(this, void 0);
        _C1__b_accessor_storage.set(this, 1);
    }
    get 0() { return __classPrivateFieldGet(this, _C1__a_accessor_storage, "f"); }
    set 0(value) { __classPrivateFieldSet(this, _C1__a_accessor_storage, value, "f"); }
    get 1() { return __classPrivateFieldGet(this, _C1__b_accessor_storage, "f"); }
    set 1(value) { __classPrivateFieldSet(this, _C1__b_accessor_storage, value, "f"); }
    static get 2() { return __classPrivateFieldGet(_a, _a, "f", _C1__c_accessor_storage); }
    static set 2(value) { __classPrivateFieldSet(_a, _a, value, "f", _C1__c_accessor_storage); }
    static get 3() { return __classPrivateFieldGet(_a, _a, "f", _C1__d_accessor_storage); }
    static set 3(value) { __classPrivateFieldSet(_a, _a, value, "f", _C1__d_accessor_storage); }
}
_a = C1, _C1__a_accessor_storage = new WeakMap(), _C1__b_accessor_storage = new WeakMap();
_C1__c_accessor_storage = { value: void 0 };
_C1__d_accessor_storage = { value: 2 };
