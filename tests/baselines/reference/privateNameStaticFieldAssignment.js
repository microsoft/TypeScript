//// [tests/cases/conformance/classes/members/privateNames/privateNameStaticFieldAssignment.ts] ////

//// [privateNameStaticFieldAssignment.ts]
class A {
    static #field = 0;
    constructor() {
        A.#field = 1;
        A.#field += 2;
        A.#field -= 3;
        A.#field /= 4;
        A.#field *= 5;
        A.#field **= 6;
        A.#field %= 7;
        A.#field <<= 8;
        A.#field >>= 9;
        A.#field >>>= 10;
        A.#field &= 11;
        A.#field |= 12;
        A.#field ^= 13;
        A.getClass().#field = 1;
        A.getClass().#field += 2;
        A.getClass().#field -= 3;
        A.getClass().#field /= 4;
        A.getClass().#field *= 5;
        A.getClass().#field **= 6;
        A.getClass().#field %= 7;
        A.getClass().#field <<= 8;
        A.getClass().#field >>= 9;
        A.getClass().#field >>>= 10;
        A.getClass().#field &= 11;
        A.getClass().#field |= 12;
        A.getClass().#field ^= 13;
    }
    static getClass() {
        return A;
    }
}


//// [privateNameStaticFieldAssignment.js]
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _a, _A_field;
class A {
    constructor() {
        var _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0;
        __classPrivateFieldSet(_a, _a, 1, "f", _A_field);
        __classPrivateFieldSet(_b = _a, _a, __classPrivateFieldGet(_b, _a, "f", _A_field) + 2, "f", _A_field);
        __classPrivateFieldSet(_c = _a, _a, __classPrivateFieldGet(_c, _a, "f", _A_field) - 3, "f", _A_field);
        __classPrivateFieldSet(_d = _a, _a, __classPrivateFieldGet(_d, _a, "f", _A_field) / 4, "f", _A_field);
        __classPrivateFieldSet(_e = _a, _a, __classPrivateFieldGet(_e, _a, "f", _A_field) * 5, "f", _A_field);
        __classPrivateFieldSet(_f = _a, _a, Math.pow(__classPrivateFieldGet(_f, _a, "f", _A_field), 6), "f", _A_field);
        __classPrivateFieldSet(_g = _a, _a, __classPrivateFieldGet(_g, _a, "f", _A_field) % 7, "f", _A_field);
        __classPrivateFieldSet(_h = _a, _a, __classPrivateFieldGet(_h, _a, "f", _A_field) << 8, "f", _A_field);
        __classPrivateFieldSet(_j = _a, _a, __classPrivateFieldGet(_j, _a, "f", _A_field) >> 9, "f", _A_field);
        __classPrivateFieldSet(_k = _a, _a, __classPrivateFieldGet(_k, _a, "f", _A_field) >>> 10, "f", _A_field);
        __classPrivateFieldSet(_l = _a, _a, __classPrivateFieldGet(_l, _a, "f", _A_field) & 11, "f", _A_field);
        __classPrivateFieldSet(_m = _a, _a, __classPrivateFieldGet(_m, _a, "f", _A_field) | 12, "f", _A_field);
        __classPrivateFieldSet(_o = _a, _a, __classPrivateFieldGet(_o, _a, "f", _A_field) ^ 13, "f", _A_field);
        __classPrivateFieldSet(_a.getClass(), _a, 1, "f", _A_field);
        __classPrivateFieldSet(_p = _a.getClass(), _a, __classPrivateFieldGet(_p, _a, "f", _A_field) + 2, "f", _A_field);
        __classPrivateFieldSet(_q = _a.getClass(), _a, __classPrivateFieldGet(_q, _a, "f", _A_field) - 3, "f", _A_field);
        __classPrivateFieldSet(_r = _a.getClass(), _a, __classPrivateFieldGet(_r, _a, "f", _A_field) / 4, "f", _A_field);
        __classPrivateFieldSet(_s = _a.getClass(), _a, __classPrivateFieldGet(_s, _a, "f", _A_field) * 5, "f", _A_field);
        __classPrivateFieldSet(_t = _a.getClass(), _a, Math.pow(__classPrivateFieldGet(_t, _a, "f", _A_field), 6), "f", _A_field);
        __classPrivateFieldSet(_u = _a.getClass(), _a, __classPrivateFieldGet(_u, _a, "f", _A_field) % 7, "f", _A_field);
        __classPrivateFieldSet(_v = _a.getClass(), _a, __classPrivateFieldGet(_v, _a, "f", _A_field) << 8, "f", _A_field);
        __classPrivateFieldSet(_w = _a.getClass(), _a, __classPrivateFieldGet(_w, _a, "f", _A_field) >> 9, "f", _A_field);
        __classPrivateFieldSet(_x = _a.getClass(), _a, __classPrivateFieldGet(_x, _a, "f", _A_field) >>> 10, "f", _A_field);
        __classPrivateFieldSet(_y = _a.getClass(), _a, __classPrivateFieldGet(_y, _a, "f", _A_field) & 11, "f", _A_field);
        __classPrivateFieldSet(_z = _a.getClass(), _a, __classPrivateFieldGet(_z, _a, "f", _A_field) | 12, "f", _A_field);
        __classPrivateFieldSet(_0 = _a.getClass(), _a, __classPrivateFieldGet(_0, _a, "f", _A_field) ^ 13, "f", _A_field);
    }
    static getClass() {
        return _a;
    }
}
_a = A;
_A_field = { value: 0 };
