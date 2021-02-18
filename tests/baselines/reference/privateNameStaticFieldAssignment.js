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
    propertyDescriptor.value = value;
    return value;
};
var __classStaticPrivateFieldGet = (this && this.__classStaticPrivateFieldGet) || function (receiver, classConstructor, propertyDescriptor) {
    if (receiver !== classConstructor) {
        throw new TypeError("Private static access of wrong provenance");
    }
    return propertyDescriptor.value;
};
var _A_field;
class A {
    constructor() {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z;
        __classStaticPrivateFieldSet(A, A, _A_field, 1);
        __classStaticPrivateFieldSet(_a = A, A, _A_field, __classStaticPrivateFieldGet(_a, A, _A_field) + 2);
        __classStaticPrivateFieldSet(_b = A, A, _A_field, __classStaticPrivateFieldGet(_b, A, _A_field) - 3);
        __classStaticPrivateFieldSet(_c = A, A, _A_field, __classStaticPrivateFieldGet(_c, A, _A_field) / 4);
        __classStaticPrivateFieldSet(_d = A, A, _A_field, __classStaticPrivateFieldGet(_d, A, _A_field) * 5);
        __classStaticPrivateFieldSet(_e = A, A, _A_field, Math.pow(__classStaticPrivateFieldGet(_e, A, _A_field), 6));
        __classStaticPrivateFieldSet(_f = A, A, _A_field, __classStaticPrivateFieldGet(_f, A, _A_field) % 7);
        __classStaticPrivateFieldSet(_g = A, A, _A_field, __classStaticPrivateFieldGet(_g, A, _A_field) << 8);
        __classStaticPrivateFieldSet(_h = A, A, _A_field, __classStaticPrivateFieldGet(_h, A, _A_field) >> 9);
        __classStaticPrivateFieldSet(_j = A, A, _A_field, __classStaticPrivateFieldGet(_j, A, _A_field) >>> 10);
        __classStaticPrivateFieldSet(_k = A, A, _A_field, __classStaticPrivateFieldGet(_k, A, _A_field) & 11);
        __classStaticPrivateFieldSet(_l = A, A, _A_field, __classStaticPrivateFieldGet(_l, A, _A_field) | 12);
        __classStaticPrivateFieldSet(_m = A, A, _A_field, __classStaticPrivateFieldGet(_m, A, _A_field) ^ 13);
        __classStaticPrivateFieldSet(A.getClass(), A, _A_field, 1);
        __classStaticPrivateFieldSet(_o = A.getClass(), A, _A_field, __classStaticPrivateFieldGet(_o, A, _A_field) + 2);
        __classStaticPrivateFieldSet(_p = A.getClass(), A, _A_field, __classStaticPrivateFieldGet(_p, A, _A_field) - 3);
        __classStaticPrivateFieldSet(_q = A.getClass(), A, _A_field, __classStaticPrivateFieldGet(_q, A, _A_field) / 4);
        __classStaticPrivateFieldSet(_r = A.getClass(), A, _A_field, __classStaticPrivateFieldGet(_r, A, _A_field) * 5);
        __classStaticPrivateFieldSet(_s = A.getClass(), A, _A_field, Math.pow(__classStaticPrivateFieldGet(_s, A, _A_field), 6));
        __classStaticPrivateFieldSet(_t = A.getClass(), A, _A_field, __classStaticPrivateFieldGet(_t, A, _A_field) % 7);
        __classStaticPrivateFieldSet(_u = A.getClass(), A, _A_field, __classStaticPrivateFieldGet(_u, A, _A_field) << 8);
        __classStaticPrivateFieldSet(_v = A.getClass(), A, _A_field, __classStaticPrivateFieldGet(_v, A, _A_field) >> 9);
        __classStaticPrivateFieldSet(_w = A.getClass(), A, _A_field, __classStaticPrivateFieldGet(_w, A, _A_field) >>> 10);
        __classStaticPrivateFieldSet(_x = A.getClass(), A, _A_field, __classStaticPrivateFieldGet(_x, A, _A_field) & 11);
        __classStaticPrivateFieldSet(_y = A.getClass(), A, _A_field, __classStaticPrivateFieldGet(_y, A, _A_field) | 12);
        __classStaticPrivateFieldSet(_z = A.getClass(), A, _A_field, __classStaticPrivateFieldGet(_z, A, _A_field) ^ 13);
    }
    static getClass() {
        return A;
    }
}
_A_field = { value: 0 };
