//// [privateNameFieldUnaryMutation.ts]
class C {
    #test: number = 24;
    constructor() {
        this.#test++;
        this.#test--;
        ++this.#test;
        --this.#test;
        const a = this.#test++;
        const b = this.#test--;
        const c = ++this.#test;
        const d = --this.#test;
        for (this.#test = 0; this.#test < 10; ++this.#test) {}
        for (this.#test = 0; this.#test < 10; this.#test++) {}
    }
    test() {
        this.getInstance().#test++;
        this.getInstance().#test--;
        ++this.getInstance().#test;
        --this.getInstance().#test;
        const a = this.getInstance().#test++;
        const b = this.getInstance().#test--;
        const c = ++this.getInstance().#test;
        const d = --this.getInstance().#test;
        for (this.getInstance().#test = 0; this.getInstance().#test < 10; ++this.getInstance().#test) {}
        for (this.getInstance().#test = 0; this.getInstance().#test < 10; this.getInstance().#test++) {}
    }
    getInstance() { return new C(); }
}


//// [privateNameFieldUnaryMutation.js]
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
var _C_test;
class C {
    constructor() {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
        _C_test.set(this, 24);
        __classPrivateFieldSet(this, _C_test, (_a = __classPrivateFieldGet(this, _C_test, "f"), _a++, _a), "f");
        __classPrivateFieldSet(this, _C_test, (_b = __classPrivateFieldGet(this, _C_test, "f"), _b--, _b), "f");
        __classPrivateFieldSet(this, _C_test, (_c = __classPrivateFieldGet(this, _C_test, "f"), ++_c), "f");
        __classPrivateFieldSet(this, _C_test, (_d = __classPrivateFieldGet(this, _C_test, "f"), --_d), "f");
        const a = (__classPrivateFieldSet(this, _C_test, (_f = __classPrivateFieldGet(this, _C_test, "f"), _e = _f++, _f), "f"), _e);
        const b = (__classPrivateFieldSet(this, _C_test, (_h = __classPrivateFieldGet(this, _C_test, "f"), _g = _h--, _h), "f"), _g);
        const c = __classPrivateFieldSet(this, _C_test, (_j = __classPrivateFieldGet(this, _C_test, "f"), ++_j), "f");
        const d = __classPrivateFieldSet(this, _C_test, (_k = __classPrivateFieldGet(this, _C_test, "f"), --_k), "f");
        for (__classPrivateFieldSet(this, _C_test, 0, "f"); __classPrivateFieldGet(this, _C_test, "f") < 10; __classPrivateFieldSet(this, _C_test, (_l = __classPrivateFieldGet(this, _C_test, "f"), ++_l), "f")) { }
        for (__classPrivateFieldSet(this, _C_test, 0, "f"); __classPrivateFieldGet(this, _C_test, "f") < 10; __classPrivateFieldSet(this, _C_test, (_m = __classPrivateFieldGet(this, _C_test, "f"), _m++, _m), "f")) { }
    }
    test() {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x;
        __classPrivateFieldSet(_a = this.getInstance(), _C_test, (_b = __classPrivateFieldGet(_a, _C_test, "f"), _b++, _b), "f");
        __classPrivateFieldSet(_c = this.getInstance(), _C_test, (_d = __classPrivateFieldGet(_c, _C_test, "f"), _d--, _d), "f");
        __classPrivateFieldSet(_e = this.getInstance(), _C_test, (_f = __classPrivateFieldGet(_e, _C_test, "f"), ++_f), "f");
        __classPrivateFieldSet(_g = this.getInstance(), _C_test, (_h = __classPrivateFieldGet(_g, _C_test, "f"), --_h), "f");
        const a = (__classPrivateFieldSet(_j = this.getInstance(), _C_test, (_l = __classPrivateFieldGet(_j, _C_test, "f"), _k = _l++, _l), "f"), _k);
        const b = (__classPrivateFieldSet(_m = this.getInstance(), _C_test, (_p = __classPrivateFieldGet(_m, _C_test, "f"), _o = _p--, _p), "f"), _o);
        const c = __classPrivateFieldSet(_q = this.getInstance(), _C_test, (_r = __classPrivateFieldGet(_q, _C_test, "f"), ++_r), "f");
        const d = __classPrivateFieldSet(_s = this.getInstance(), _C_test, (_t = __classPrivateFieldGet(_s, _C_test, "f"), --_t), "f");
        for (__classPrivateFieldSet(this.getInstance(), _C_test, 0, "f"); __classPrivateFieldGet(this.getInstance(), _C_test, "f") < 10; __classPrivateFieldSet(_u = this.getInstance(), _C_test, (_v = __classPrivateFieldGet(_u, _C_test, "f"), ++_v), "f")) { }
        for (__classPrivateFieldSet(this.getInstance(), _C_test, 0, "f"); __classPrivateFieldGet(this.getInstance(), _C_test, "f") < 10; __classPrivateFieldSet(_w = this.getInstance(), _C_test, (_x = __classPrivateFieldGet(_w, _C_test, "f"), _x++, _x), "f")) { }
    }
    getInstance() { return new C(); }
}
_C_test = new WeakMap();
