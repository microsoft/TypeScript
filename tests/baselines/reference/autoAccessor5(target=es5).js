//// [tests/cases/conformance/classes/propertyMemberDeclarations/autoAccessor5.ts] ////

//// [autoAccessor5.ts]
class C1 {
    accessor ["w"]: any;
    accessor ["x"] = 1;
    static accessor ["y"]: any;
    static accessor ["z"] = 2;
}

declare var f: any;
class C2 {
    accessor [f()] = 1;
}

//// [autoAccessor5.js]
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
var _C2__a_accessor_storage, _a;
var C1 = /** @class */ (function () {
    function C1() {
        _C1__b_accessor_storage.set(this, void 0);
        _C1__c_accessor_storage.set(this, 1);
    }
    Object.defineProperty(C1.prototype, (_C1__b_accessor_storage = new WeakMap(), _C1__c_accessor_storage = new WeakMap(), "w"), {
        get: function () { return __classPrivateFieldGet(this, _C1__b_accessor_storage, "f"); },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(C1.prototype, "w", {
        set: function (value) { __classPrivateFieldSet(this, _C1__b_accessor_storage, value, "f"); },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(C1.prototype, "x", {
        get: function () { return __classPrivateFieldGet(this, _C1__c_accessor_storage, "f"); },
        set: function (value) { __classPrivateFieldSet(this, _C1__c_accessor_storage, value, "f"); },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(C1, "y", {
        get: function () { return __classPrivateFieldGet(_b, _b, "f", _C1__d_accessor_storage); },
        set: function (value) { __classPrivateFieldSet(_b, _b, value, "f", _C1__d_accessor_storage); },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(C1, "z", {
        get: function () { return __classPrivateFieldGet(_b, _b, "f", _C1__e_accessor_storage); },
        set: function (value) { __classPrivateFieldSet(_b, _b, value, "f", _C1__e_accessor_storage); },
        enumerable: false,
        configurable: true
    });
    var _b, _C1__b_accessor_storage, _C1__c_accessor_storage, _C1__d_accessor_storage, _C1__e_accessor_storage;
    _b = C1;
    _C1__d_accessor_storage = { value: void 0 };
    _C1__e_accessor_storage = { value: 2 };
    return C1;
}());
var C2 = /** @class */ (function () {
    function C2() {
        _C2__a_accessor_storage.set(this, 1);
    }
    Object.defineProperty(C2.prototype, (_C2__a_accessor_storage = new WeakMap(), _a = f()), {
        get: function () { return __classPrivateFieldGet(this, _C2__a_accessor_storage, "f"); },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(C2.prototype, _a, {
        set: function (value) { __classPrivateFieldSet(this, _C2__a_accessor_storage, value, "f"); },
        enumerable: false,
        configurable: true
    });
    return C2;
}());
