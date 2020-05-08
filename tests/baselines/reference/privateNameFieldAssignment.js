//// [privateNameFieldAssignment.ts]
class A {
    #field = 0;
    constructor() {
        this.#field = 1;
        this.#field += 2;
        this.#field -= 3;
        this.#field /= 4;
        this.#field *= 5;
        this.#field **= 6;
        this.#field %= 7;
        this.#field <<= 8;
        this.#field >>= 9;
        this.#field >>>= 10;
        this.#field &= 11;
        this.#field |= 12;
        this.#field ^= 13;
        A.getInstance().#field = 1;
        A.getInstance().#field += 2;
        A.getInstance().#field -= 3;
        A.getInstance().#field /= 4;
        A.getInstance().#field *= 5;
        A.getInstance().#field **= 6;
        A.getInstance().#field %= 7;
        A.getInstance().#field <<= 8;
        A.getInstance().#field >>= 9;
        A.getInstance().#field >>>= 10;
        A.getInstance().#field &= 11;
        A.getInstance().#field |= 12;
        A.getInstance().#field ^= 13;
    }
    static getInstance() {
        return new A();
    }
}


//// [privateNameFieldAssignment.js]
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
};
var _field;
class A {
    constructor() {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
        _field.set(this, 0);
        __classPrivateFieldSet(this, _field, 1);
        __classPrivateFieldSet(this, _field, __classPrivateFieldGet(this, _field) + 2);
        __classPrivateFieldSet(this, _field, __classPrivateFieldGet(this, _field) - 3);
        __classPrivateFieldSet(this, _field, __classPrivateFieldGet(this, _field) / 4);
        __classPrivateFieldSet(this, _field, __classPrivateFieldGet(this, _field) * 5);
        __classPrivateFieldSet(this, _field, Math.pow(__classPrivateFieldGet(this, _field), 6));
        __classPrivateFieldSet(this, _field, __classPrivateFieldGet(this, _field) % 7);
        __classPrivateFieldSet(this, _field, __classPrivateFieldGet(this, _field) << 8);
        __classPrivateFieldSet(this, _field, __classPrivateFieldGet(this, _field) >> 9);
        __classPrivateFieldSet(this, _field, __classPrivateFieldGet(this, _field) >>> 10);
        __classPrivateFieldSet(this, _field, __classPrivateFieldGet(this, _field) & 11);
        __classPrivateFieldSet(this, _field, __classPrivateFieldGet(this, _field) | 12);
        __classPrivateFieldSet(this, _field, __classPrivateFieldGet(this, _field) ^ 13);
        __classPrivateFieldSet(A.getInstance(), _field, 1);
        __classPrivateFieldSet(_a = A.getInstance(), _field, __classPrivateFieldGet(_a, _field) + 2);
        __classPrivateFieldSet(_b = A.getInstance(), _field, __classPrivateFieldGet(_b, _field) - 3);
        __classPrivateFieldSet(_c = A.getInstance(), _field, __classPrivateFieldGet(_c, _field) / 4);
        __classPrivateFieldSet(_d = A.getInstance(), _field, __classPrivateFieldGet(_d, _field) * 5);
        __classPrivateFieldSet(_e = A.getInstance(), _field, Math.pow(__classPrivateFieldGet(_e, _field), 6));
        __classPrivateFieldSet(_f = A.getInstance(), _field, __classPrivateFieldGet(_f, _field) % 7);
        __classPrivateFieldSet(_g = A.getInstance(), _field, __classPrivateFieldGet(_g, _field) << 8);
        __classPrivateFieldSet(_h = A.getInstance(), _field, __classPrivateFieldGet(_h, _field) >> 9);
        __classPrivateFieldSet(_j = A.getInstance(), _field, __classPrivateFieldGet(_j, _field) >>> 10);
        __classPrivateFieldSet(_k = A.getInstance(), _field, __classPrivateFieldGet(_k, _field) & 11);
        __classPrivateFieldSet(_l = A.getInstance(), _field, __classPrivateFieldGet(_l, _field) | 12);
        __classPrivateFieldSet(_m = A.getInstance(), _field, __classPrivateFieldGet(_m, _field) ^ 13);
    }
    static getInstance() {
        return new A();
    }
}
_field = new WeakMap();
