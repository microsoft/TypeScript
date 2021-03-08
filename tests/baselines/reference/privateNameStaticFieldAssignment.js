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
var __classStaticPrivateFieldSet = (this && this.__classStaticPrivateFieldSet) || function (receiver, classConstructor, propertyDescriptor, value) {
    if (receiver !== classConstructor) {
        throw new TypeError("Private static access of wrong provenance");
    }
    if (propertyDescriptor === undefined) {
        throw new TypeError("Private static field was accessed before its declaration.");
    }
    propertyDescriptor.value = value;
    return value;
};
var __classStaticPrivateFieldGet = (this && this.__classStaticPrivateFieldGet) || function (receiver, classConstructor, propertyDescriptor) {
    if (receiver !== classConstructor) {
        throw new TypeError("Private static access of wrong provenance");
    }
    if (propertyDescriptor === undefined) {
        throw new TypeError("Private static field was accessed before its declaration.");
    }
    return propertyDescriptor.value;
};
var _a, _A_field;
class A {
    constructor() {
        var _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0;
        __classStaticPrivateFieldSet(A, _a, _A_field, 1);
        __classStaticPrivateFieldSet(_b = A, _a, _A_field, __classStaticPrivateFieldGet(_b, _a, _A_field) + 2);
        __classStaticPrivateFieldSet(_c = A, _a, _A_field, __classStaticPrivateFieldGet(_c, _a, _A_field) - 3);
        __classStaticPrivateFieldSet(_d = A, _a, _A_field, __classStaticPrivateFieldGet(_d, _a, _A_field) / 4);
        __classStaticPrivateFieldSet(_e = A, _a, _A_field, __classStaticPrivateFieldGet(_e, _a, _A_field) * 5);
        __classStaticPrivateFieldSet(_f = A, _a, _A_field, Math.pow(__classStaticPrivateFieldGet(_f, _a, _A_field), 6));
        __classStaticPrivateFieldSet(_g = A, _a, _A_field, __classStaticPrivateFieldGet(_g, _a, _A_field) % 7);
        __classStaticPrivateFieldSet(_h = A, _a, _A_field, __classStaticPrivateFieldGet(_h, _a, _A_field) << 8);
        __classStaticPrivateFieldSet(_j = A, _a, _A_field, __classStaticPrivateFieldGet(_j, _a, _A_field) >> 9);
        __classStaticPrivateFieldSet(_k = A, _a, _A_field, __classStaticPrivateFieldGet(_k, _a, _A_field) >>> 10);
        __classStaticPrivateFieldSet(_l = A, _a, _A_field, __classStaticPrivateFieldGet(_l, _a, _A_field) & 11);
        __classStaticPrivateFieldSet(_m = A, _a, _A_field, __classStaticPrivateFieldGet(_m, _a, _A_field) | 12);
        __classStaticPrivateFieldSet(_o = A, _a, _A_field, __classStaticPrivateFieldGet(_o, _a, _A_field) ^ 13);
        __classStaticPrivateFieldSet(A.getClass(), _a, _A_field, 1);
        __classStaticPrivateFieldSet(_p = A.getClass(), _a, _A_field, __classStaticPrivateFieldGet(_p, _a, _A_field) + 2);
        __classStaticPrivateFieldSet(_q = A.getClass(), _a, _A_field, __classStaticPrivateFieldGet(_q, _a, _A_field) - 3);
        __classStaticPrivateFieldSet(_r = A.getClass(), _a, _A_field, __classStaticPrivateFieldGet(_r, _a, _A_field) / 4);
        __classStaticPrivateFieldSet(_s = A.getClass(), _a, _A_field, __classStaticPrivateFieldGet(_s, _a, _A_field) * 5);
        __classStaticPrivateFieldSet(_t = A.getClass(), _a, _A_field, Math.pow(__classStaticPrivateFieldGet(_t, _a, _A_field), 6));
        __classStaticPrivateFieldSet(_u = A.getClass(), _a, _A_field, __classStaticPrivateFieldGet(_u, _a, _A_field) % 7);
        __classStaticPrivateFieldSet(_v = A.getClass(), _a, _A_field, __classStaticPrivateFieldGet(_v, _a, _A_field) << 8);
        __classStaticPrivateFieldSet(_w = A.getClass(), _a, _A_field, __classStaticPrivateFieldGet(_w, _a, _A_field) >> 9);
        __classStaticPrivateFieldSet(_x = A.getClass(), _a, _A_field, __classStaticPrivateFieldGet(_x, _a, _A_field) >>> 10);
        __classStaticPrivateFieldSet(_y = A.getClass(), _a, _A_field, __classStaticPrivateFieldGet(_y, _a, _A_field) & 11);
        __classStaticPrivateFieldSet(_z = A.getClass(), _a, _A_field, __classStaticPrivateFieldGet(_z, _a, _A_field) | 12);
        __classStaticPrivateFieldSet(_0 = A.getClass(), _a, _A_field, __classStaticPrivateFieldGet(_0, _a, _A_field) ^ 13);
    }
    static getClass() {
        return A;
    }
}
_a = A;
_A_field = { value: 0 };
