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
var _A_field;
class A {
    constructor() {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
        _A_field.set(this, 0);
        __classPrivateFieldSet(this, _A_field, 1, "f");
        __classPrivateFieldSet(this, _A_field, __classPrivateFieldGet(this, _A_field, "f") + 2, "f");
        __classPrivateFieldSet(this, _A_field, __classPrivateFieldGet(this, _A_field, "f") - 3, "f");
        __classPrivateFieldSet(this, _A_field, __classPrivateFieldGet(this, _A_field, "f") / 4, "f");
        __classPrivateFieldSet(this, _A_field, __classPrivateFieldGet(this, _A_field, "f") * 5, "f");
        __classPrivateFieldSet(this, _A_field, Math.pow(__classPrivateFieldGet(this, _A_field, "f"), 6), "f");
        __classPrivateFieldSet(this, _A_field, __classPrivateFieldGet(this, _A_field, "f") % 7, "f");
        __classPrivateFieldSet(this, _A_field, __classPrivateFieldGet(this, _A_field, "f") << 8, "f");
        __classPrivateFieldSet(this, _A_field, __classPrivateFieldGet(this, _A_field, "f") >> 9, "f");
        __classPrivateFieldSet(this, _A_field, __classPrivateFieldGet(this, _A_field, "f") >>> 10, "f");
        __classPrivateFieldSet(this, _A_field, __classPrivateFieldGet(this, _A_field, "f") & 11, "f");
        __classPrivateFieldSet(this, _A_field, __classPrivateFieldGet(this, _A_field, "f") | 12, "f");
        __classPrivateFieldSet(this, _A_field, __classPrivateFieldGet(this, _A_field, "f") ^ 13, "f");
        __classPrivateFieldSet(A.getInstance(), _A_field, 1, "f");
        __classPrivateFieldSet(_a = A.getInstance(), _A_field, __classPrivateFieldGet(_a, _A_field, "f") + 2, "f");
        __classPrivateFieldSet(_b = A.getInstance(), _A_field, __classPrivateFieldGet(_b, _A_field, "f") - 3, "f");
        __classPrivateFieldSet(_c = A.getInstance(), _A_field, __classPrivateFieldGet(_c, _A_field, "f") / 4, "f");
        __classPrivateFieldSet(_d = A.getInstance(), _A_field, __classPrivateFieldGet(_d, _A_field, "f") * 5, "f");
        __classPrivateFieldSet(_e = A.getInstance(), _A_field, Math.pow(__classPrivateFieldGet(_e, _A_field, "f"), 6), "f");
        __classPrivateFieldSet(_f = A.getInstance(), _A_field, __classPrivateFieldGet(_f, _A_field, "f") % 7, "f");
        __classPrivateFieldSet(_g = A.getInstance(), _A_field, __classPrivateFieldGet(_g, _A_field, "f") << 8, "f");
        __classPrivateFieldSet(_h = A.getInstance(), _A_field, __classPrivateFieldGet(_h, _A_field, "f") >> 9, "f");
        __classPrivateFieldSet(_j = A.getInstance(), _A_field, __classPrivateFieldGet(_j, _A_field, "f") >>> 10, "f");
        __classPrivateFieldSet(_k = A.getInstance(), _A_field, __classPrivateFieldGet(_k, _A_field, "f") & 11, "f");
        __classPrivateFieldSet(_l = A.getInstance(), _A_field, __classPrivateFieldGet(_l, _A_field, "f") | 12, "f");
        __classPrivateFieldSet(_m = A.getInstance(), _A_field, __classPrivateFieldGet(_m, _A_field, "f") ^ 13, "f");
    }
    static getInstance() {
        return new A();
    }
}
_A_field = new WeakMap();
