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
        var _a, _b;
        _C_test.set(this, 24);
        __classPrivateFieldSet(this, _C_test, +__classPrivateFieldGet(this, _C_test, "f") + 1, "f");
        __classPrivateFieldSet(this, _C_test, +__classPrivateFieldGet(this, _C_test, "f") - 1, "f");
        __classPrivateFieldSet(this, _C_test, +__classPrivateFieldGet(this, _C_test, "f") + 1, "f");
        __classPrivateFieldSet(this, _C_test, +__classPrivateFieldGet(this, _C_test, "f") - 1, "f");
        const a = (__classPrivateFieldSet(this, _C_test, (_a = +__classPrivateFieldGet(this, _C_test, "f")) + 1, "f"), _a);
        const b = (__classPrivateFieldSet(this, _C_test, (_b = +__classPrivateFieldGet(this, _C_test, "f")) - 1, "f"), _b);
        const c = __classPrivateFieldSet(this, _C_test, +__classPrivateFieldGet(this, _C_test, "f") + 1, "f");
        const d = __classPrivateFieldSet(this, _C_test, +__classPrivateFieldGet(this, _C_test, "f") - 1, "f");
        for (__classPrivateFieldSet(this, _C_test, 0, "f"); __classPrivateFieldGet(this, _C_test, "f") < 10; __classPrivateFieldSet(this, _C_test, +__classPrivateFieldGet(this, _C_test, "f") + 1, "f")) { }
        for (__classPrivateFieldSet(this, _C_test, 0, "f"); __classPrivateFieldGet(this, _C_test, "f") < 10; __classPrivateFieldSet(this, _C_test, +__classPrivateFieldGet(this, _C_test, "f") + 1, "f")) { }
    }
    test() {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
        __classPrivateFieldSet(_a = this.getInstance(), _C_test, +__classPrivateFieldGet(_a, _C_test, "f") + 1, "f");
        __classPrivateFieldSet(_b = this.getInstance(), _C_test, +__classPrivateFieldGet(_b, _C_test, "f") - 1, "f");
        __classPrivateFieldSet(_c = this.getInstance(), _C_test, +__classPrivateFieldGet(_c, _C_test, "f") + 1, "f");
        __classPrivateFieldSet(_d = this.getInstance(), _C_test, +__classPrivateFieldGet(_d, _C_test, "f") - 1, "f");
        const a = (__classPrivateFieldSet(_e = this.getInstance(), _C_test, (_f = +__classPrivateFieldGet(_e, _C_test, "f")) + 1, "f"), _f);
        const b = (__classPrivateFieldSet(_g = this.getInstance(), _C_test, (_h = +__classPrivateFieldGet(_g, _C_test, "f")) - 1, "f"), _h);
        const c = __classPrivateFieldSet(_j = this.getInstance(), _C_test, +__classPrivateFieldGet(_j, _C_test, "f") + 1, "f");
        const d = __classPrivateFieldSet(_k = this.getInstance(), _C_test, +__classPrivateFieldGet(_k, _C_test, "f") - 1, "f");
        for (__classPrivateFieldSet(this.getInstance(), _C_test, 0, "f"); __classPrivateFieldGet(this.getInstance(), _C_test, "f") < 10; __classPrivateFieldSet(_l = this.getInstance(), _C_test, +__classPrivateFieldGet(_l, _C_test, "f") + 1, "f")) { }
        for (__classPrivateFieldSet(this.getInstance(), _C_test, 0, "f"); __classPrivateFieldGet(this.getInstance(), _C_test, "f") < 10; __classPrivateFieldSet(_m = this.getInstance(), _C_test, +__classPrivateFieldGet(_m, _C_test, "f") + 1, "f")) { }
    }
    getInstance() { return new C(); }
}
_C_test = new WeakMap();
