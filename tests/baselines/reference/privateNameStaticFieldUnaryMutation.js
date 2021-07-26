//// [privateNameStaticFieldUnaryMutation.ts]
class C {
    static #test: number = 24;
    constructor() {
        C.#test++;
        C.#test--;
        ++C.#test;
        --C.#test;
        const a = C.#test++;
        const b = C.#test--;
        const c = ++C.#test;
        const d = --C.#test;
        for (C.#test = 0; C.#test < 10; ++C.#test) {}
        for (C.#test = 0; C.#test < 10; C.#test++) {}
    }
    test() {
        this.getClass().#test++;
        this.getClass().#test--;
        ++this.getClass().#test;
        --this.getClass().#test;
        const a = this.getClass().#test++;
        const b = this.getClass().#test--;
        const c = ++this.getClass().#test;
        const d = --this.getClass().#test;
        for (this.getClass().#test = 0; this.getClass().#test < 10; ++this.getClass().#test) {}
        for (this.getClass().#test = 0; this.getClass().#test < 10; this.getClass().#test++) {}
    }
    getClass() { return C; }
}


//// [privateNameStaticFieldUnaryMutation.js]
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
var _a, _C_test;
class C {
    constructor() {
        var _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y;
        __classPrivateFieldSet(_b = C, _a, (_c = __classPrivateFieldGet(_b, _a, "f", _C_test), _c++, _c), "f", _C_test);
        __classPrivateFieldSet(_d = C, _a, (_e = __classPrivateFieldGet(_d, _a, "f", _C_test), _e--, _e), "f", _C_test);
        __classPrivateFieldSet(_f = C, _a, (_g = __classPrivateFieldGet(_f, _a, "f", _C_test), ++_g), "f", _C_test);
        __classPrivateFieldSet(_h = C, _a, (_j = __classPrivateFieldGet(_h, _a, "f", _C_test), --_j), "f", _C_test);
        const a = (__classPrivateFieldSet(_k = C, _a, (_m = __classPrivateFieldGet(_k, _a, "f", _C_test), _l = _m++, _m), "f", _C_test), _l);
        const b = (__classPrivateFieldSet(_o = C, _a, (_q = __classPrivateFieldGet(_o, _a, "f", _C_test), _p = _q--, _q), "f", _C_test), _p);
        const c = __classPrivateFieldSet(_r = C, _a, (_s = __classPrivateFieldGet(_r, _a, "f", _C_test), ++_s), "f", _C_test);
        const d = __classPrivateFieldSet(_t = C, _a, (_u = __classPrivateFieldGet(_t, _a, "f", _C_test), --_u), "f", _C_test);
        for (__classPrivateFieldSet(C, _a, 0, "f", _C_test); __classPrivateFieldGet(C, _a, "f", _C_test) < 10; __classPrivateFieldSet(_v = C, _a, (_w = __classPrivateFieldGet(_v, _a, "f", _C_test), ++_w), "f", _C_test)) { }
        for (__classPrivateFieldSet(C, _a, 0, "f", _C_test); __classPrivateFieldGet(C, _a, "f", _C_test) < 10; __classPrivateFieldSet(_x = C, _a, (_y = __classPrivateFieldGet(_x, _a, "f", _C_test), _y++, _y), "f", _C_test)) { }
    }
    test() {
        var _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y;
        __classPrivateFieldSet(_b = this.getClass(), _a, (_c = __classPrivateFieldGet(_b, _a, "f", _C_test), _c++, _c), "f", _C_test);
        __classPrivateFieldSet(_d = this.getClass(), _a, (_e = __classPrivateFieldGet(_d, _a, "f", _C_test), _e--, _e), "f", _C_test);
        __classPrivateFieldSet(_f = this.getClass(), _a, (_g = __classPrivateFieldGet(_f, _a, "f", _C_test), ++_g), "f", _C_test);
        __classPrivateFieldSet(_h = this.getClass(), _a, (_j = __classPrivateFieldGet(_h, _a, "f", _C_test), --_j), "f", _C_test);
        const a = (__classPrivateFieldSet(_k = this.getClass(), _a, (_m = __classPrivateFieldGet(_k, _a, "f", _C_test), _l = _m++, _m), "f", _C_test), _l);
        const b = (__classPrivateFieldSet(_o = this.getClass(), _a, (_q = __classPrivateFieldGet(_o, _a, "f", _C_test), _p = _q--, _q), "f", _C_test), _p);
        const c = __classPrivateFieldSet(_r = this.getClass(), _a, (_s = __classPrivateFieldGet(_r, _a, "f", _C_test), ++_s), "f", _C_test);
        const d = __classPrivateFieldSet(_t = this.getClass(), _a, (_u = __classPrivateFieldGet(_t, _a, "f", _C_test), --_u), "f", _C_test);
        for (__classPrivateFieldSet(this.getClass(), _a, 0, "f", _C_test); __classPrivateFieldGet(this.getClass(), _a, "f", _C_test) < 10; __classPrivateFieldSet(_v = this.getClass(), _a, (_w = __classPrivateFieldGet(_v, _a, "f", _C_test), ++_w), "f", _C_test)) { }
        for (__classPrivateFieldSet(this.getClass(), _a, 0, "f", _C_test); __classPrivateFieldGet(this.getClass(), _a, "f", _C_test) < 10; __classPrivateFieldSet(_x = this.getClass(), _a, (_y = __classPrivateFieldGet(_x, _a, "f", _C_test), _y++, _y), "f", _C_test)) { }
    }
    getClass() { return C; }
}
_a = C;
_C_test = { value: 24 };
