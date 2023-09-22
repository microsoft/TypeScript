//// [tests/cases/conformance/classes/propertyMemberDeclarations/autoAccessor3.ts] ////

//// [autoAccessor3.ts]
class C1 {
    accessor "w": any;
    accessor "x" = 1;
    static accessor "y": any;
    static accessor "z" = 2;
}


//// [autoAccessor3.js]
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
    get "w"() { return __classPrivateFieldGet(this, _C1__a_accessor_storage, "f"); }
    set "w"(value) { __classPrivateFieldSet(this, _C1__a_accessor_storage, value, "f"); }
    get "x"() { return __classPrivateFieldGet(this, _C1__b_accessor_storage, "f"); }
    set "x"(value) { __classPrivateFieldSet(this, _C1__b_accessor_storage, value, "f"); }
    static get "y"() { return __classPrivateFieldGet(_a, _a, "f", _C1__c_accessor_storage); }
    static set "y"(value) { __classPrivateFieldSet(_a, _a, value, "f", _C1__c_accessor_storage); }
    static get "z"() { return __classPrivateFieldGet(_a, _a, "f", _C1__d_accessor_storage); }
    static set "z"(value) { __classPrivateFieldSet(_a, _a, value, "f", _C1__d_accessor_storage); }
}
_a = C1, _C1__a_accessor_storage = new WeakMap(), _C1__b_accessor_storage = new WeakMap();
_C1__c_accessor_storage = { value: void 0 };
_C1__d_accessor_storage = { value: 2 };
