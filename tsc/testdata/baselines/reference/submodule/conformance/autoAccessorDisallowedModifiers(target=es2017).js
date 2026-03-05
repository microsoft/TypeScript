//// [tests/cases/conformance/classes/propertyMemberDeclarations/autoAccessorDisallowedModifiers.ts] ////

//// [autoAccessorDisallowedModifiers.ts]
abstract class C1 {
    accessor accessor a: any;
    readonly accessor b: any;
    declare accessor c: any;
    accessor public d: any;
    accessor private e: any;
    accessor protected f: any;
    accessor abstract g: any;
    accessor static h: any;
    accessor i() {}
    accessor get j() { return false; }
    accessor set k(v: any) {}
    accessor constructor() {}
    accessor l?: any;
    accessor readonly m: any;
    accessor declare n: any;
}

class C2 extends C1 {
    accessor override g: any;
}

interface I1 {
    accessor a: number;
}

accessor class C3 {}
accessor interface I2 {}
accessor namespace N1 {}
accessor enum E1 {}
accessor var V1: any;
accessor type T1 = never;
accessor function F1() {}
accessor import "x";
accessor import {} from "x";
accessor export { V1 };
accessor export default V1;
accessor import N2 = N1;


//// [autoAccessorDisallowedModifiers.js]
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
var _a, _C1_a_accessor_storage, _C1_b_accessor_storage, _C1_d_accessor_storage, _C1_e_accessor_storage, _C1_f_accessor_storage, _C1_h_accessor_storage, _C1_l_accessor_storage, _C1_m_accessor_storage, _C2_g_accessor_storage;
class C1 {
    get a() { return __classPrivateFieldGet(this, _C1_a_accessor_storage, "f"); }
    set a(value) { __classPrivateFieldSet(this, _C1_a_accessor_storage, value, "f"); }
    get b() { return __classPrivateFieldGet(this, _C1_b_accessor_storage, "f"); }
    set b(value) { __classPrivateFieldSet(this, _C1_b_accessor_storage, value, "f"); }
    get d() { return __classPrivateFieldGet(this, _C1_d_accessor_storage, "f"); }
    set d(value) { __classPrivateFieldSet(this, _C1_d_accessor_storage, value, "f"); }
    get e() { return __classPrivateFieldGet(this, _C1_e_accessor_storage, "f"); }
    set e(value) { __classPrivateFieldSet(this, _C1_e_accessor_storage, value, "f"); }
    get f() { return __classPrivateFieldGet(this, _C1_f_accessor_storage, "f"); }
    set f(value) { __classPrivateFieldSet(this, _C1_f_accessor_storage, value, "f"); }
    static get h() { return __classPrivateFieldGet(_a, _a, "f", _C1_h_accessor_storage); }
    static set h(value) { __classPrivateFieldSet(_a, _a, value, "f", _C1_h_accessor_storage); }
    i() { }
    get j() { return false; }
    set k(v) { }
    constructor() {
        _C1_a_accessor_storage.set(this, void 0);
        _C1_b_accessor_storage.set(this, void 0);
        _C1_d_accessor_storage.set(this, void 0);
        _C1_e_accessor_storage.set(this, void 0);
        _C1_f_accessor_storage.set(this, void 0);
        _C1_l_accessor_storage.set(this, void 0);
        _C1_m_accessor_storage.set(this, void 0);
    }
    get l() { return __classPrivateFieldGet(this, _C1_l_accessor_storage, "f"); }
    set l(value) { __classPrivateFieldSet(this, _C1_l_accessor_storage, value, "f"); }
    get m() { return __classPrivateFieldGet(this, _C1_m_accessor_storage, "f"); }
    set m(value) { __classPrivateFieldSet(this, _C1_m_accessor_storage, value, "f"); }
}
_a = C1, _C1_a_accessor_storage = new WeakMap(), _C1_b_accessor_storage = new WeakMap(), _C1_d_accessor_storage = new WeakMap(), _C1_e_accessor_storage = new WeakMap(), _C1_f_accessor_storage = new WeakMap(), _C1_l_accessor_storage = new WeakMap(), _C1_m_accessor_storage = new WeakMap();
_C1_h_accessor_storage = { value: void 0 };
class C2 extends C1 {
    constructor() {
        super(...arguments);
        _C2_g_accessor_storage.set(this, void 0);
    }
    get g() { return __classPrivateFieldGet(this, _C2_g_accessor_storage, "f"); }
    set g(value) { __classPrivateFieldSet(this, _C2_g_accessor_storage, value, "f"); }
}
_C2_g_accessor_storage = new WeakMap();
class C3 {
}
accessor var E1;
(function (E1) {
})(E1 || (E1 = {}));
accessor var V1;
accessor function F1() { }
accessor import "x";
export { V1 };
export default V1;
