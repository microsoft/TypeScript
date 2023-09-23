//// [tests/cases/conformance/classes/propertyMemberDeclarations/autoAccessorExperimentalDecorators.ts] ////

//// [autoAccessorExperimentalDecorators.ts]
declare var dec: (target: any, key: PropertyKey, desc: PropertyDescriptor) => void;

class C1 {
    @dec
    accessor a: any;

    @dec
    static accessor b: any;
}

class C2 {
    @dec
    accessor #a: any;

    @dec
    static accessor #b: any;
}


//// [autoAccessorExperimentalDecorators.js]
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
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
var _a, _C1_a_accessor_storage, _C1_b_accessor_storage, _C2_instances, _b, _C2_a_get, _C2_a_set, _C2_b_get, _C2_b_set, _C2_a_1_accessor_storage, _C2_b_1_accessor_storage;
class C1 {
    constructor() {
        _C1_a_accessor_storage.set(this, void 0);
    }
    get a() { return __classPrivateFieldGet(this, _C1_a_accessor_storage, "f"); }
    set a(value) { __classPrivateFieldSet(this, _C1_a_accessor_storage, value, "f"); }
    static get b() { return __classPrivateFieldGet(_a, _a, "f", _C1_b_accessor_storage); }
    static set b(value) { __classPrivateFieldSet(_a, _a, value, "f", _C1_b_accessor_storage); }
}
_a = C1, _C1_a_accessor_storage = new WeakMap();
_C1_b_accessor_storage = { value: void 0 };
__decorate([
    dec
], C1.prototype, "a", null);
__decorate([
    dec
], C1, "b", null);
class C2 {
    constructor() {
        _C2_instances.add(this);
        _C2_a_1_accessor_storage.set(this, void 0);
    }
}
_b = C2, _C2_instances = new WeakSet(), _C2_a_1_accessor_storage = new WeakMap(), _C2_a_get = function _C2_a_get() { return __classPrivateFieldGet(this, _C2_a_1_accessor_storage, "f"); }, _C2_a_set = function _C2_a_set(value) { __classPrivateFieldSet(this, _C2_a_1_accessor_storage, value, "f"); }, _C2_b_get = function _C2_b_get() { return __classPrivateFieldGet(_b, _b, "f", _C2_b_1_accessor_storage); }, _C2_b_set = function _C2_b_set(value) { __classPrivateFieldSet(_b, _b, value, "f", _C2_b_1_accessor_storage); };
_C2_b_1_accessor_storage = { value: void 0 };
