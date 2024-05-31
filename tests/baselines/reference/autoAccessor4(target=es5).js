//// [tests/cases/conformance/classes/propertyMemberDeclarations/autoAccessor4.ts] ////

//// [autoAccessor4.ts]
class C1 {
    accessor 0: any;
    accessor 1 = 1;
    static accessor 2: any;
    static accessor 3 = 2;
}




!!!! File autoAccessor4.js missing from original emit, but present in noCheck emit
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
var C1 = /** @class */ (function () {
    function C1() {
        _C1__a_accessor_storage.set(this, void 0);
        _C1__b_accessor_storage.set(this, 1);
    }
    Object.defineProperty(C1.prototype, 0, {
        get: function () { return __classPrivateFieldGet(this, _C1__a_accessor_storage, "f"); },
        set: function (value) { __classPrivateFieldSet(this, _C1__a_accessor_storage, value, "f"); },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(C1.prototype, 1, {
        get: function () { return __classPrivateFieldGet(this, _C1__b_accessor_storage, "f"); },
        set: function (value) { __classPrivateFieldSet(this, _C1__b_accessor_storage, value, "f"); },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(C1, 2, {
        get: function () { return __classPrivateFieldGet(_a, _a, "f", _C1__c_accessor_storage); },
        set: function (value) { __classPrivateFieldSet(_a, _a, value, "f", _C1__c_accessor_storage); },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(C1, 3, {
        get: function () { return __classPrivateFieldGet(_a, _a, "f", _C1__d_accessor_storage); },
        set: function (value) { __classPrivateFieldSet(_a, _a, value, "f", _C1__d_accessor_storage); },
        enumerable: false,
        configurable: true
    });
    var _a, _C1__a_accessor_storage, _C1__b_accessor_storage, _C1__c_accessor_storage, _C1__d_accessor_storage;
    _a = C1, _C1__a_accessor_storage = new WeakMap(), _C1__b_accessor_storage = new WeakMap();
    _C1__c_accessor_storage = { value: void 0 };
    _C1__d_accessor_storage = { value: 2 };
    return C1;
}());
