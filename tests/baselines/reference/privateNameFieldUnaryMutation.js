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
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
};
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
};
var _test;
class C {
    constructor() {
        var _a, _b;
        _test.set(this, 24);
        __classPrivateFieldSet(this, _test, +__classPrivateFieldGet(this, _test) + 1);
        __classPrivateFieldSet(this, _test, +__classPrivateFieldGet(this, _test) - 1);
        __classPrivateFieldSet(this, _test, +__classPrivateFieldGet(this, _test) + 1);
        __classPrivateFieldSet(this, _test, +__classPrivateFieldGet(this, _test) - 1);
        const a = (__classPrivateFieldSet(this, _test, (_a = +__classPrivateFieldGet(this, _test)) + 1), _a);
        const b = (__classPrivateFieldSet(this, _test, (_b = +__classPrivateFieldGet(this, _test)) - 1), _b);
        const c = __classPrivateFieldSet(this, _test, +__classPrivateFieldGet(this, _test) + 1);
        const d = __classPrivateFieldSet(this, _test, +__classPrivateFieldGet(this, _test) - 1);
        for (__classPrivateFieldSet(this, _test, 0); __classPrivateFieldGet(this, _test) < 10; __classPrivateFieldSet(this, _test, +__classPrivateFieldGet(this, _test) + 1)) { }
        for (__classPrivateFieldSet(this, _test, 0); __classPrivateFieldGet(this, _test) < 10; __classPrivateFieldSet(this, _test, +__classPrivateFieldGet(this, _test) + 1)) { }
    }
    test() {
        var _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p;
        __classPrivateFieldSet(_c = this.getInstance(), _test, +__classPrivateFieldGet(_c, _test) + 1);
        __classPrivateFieldSet(_d = this.getInstance(), _test, +__classPrivateFieldGet(_d, _test) - 1);
        __classPrivateFieldSet(_e = this.getInstance(), _test, +__classPrivateFieldGet(_e, _test) + 1);
        __classPrivateFieldSet(_f = this.getInstance(), _test, +__classPrivateFieldGet(_f, _test) - 1);
        const a = (__classPrivateFieldSet(_g = this.getInstance(), _test, (_h = +__classPrivateFieldGet(_g, _test)) + 1), _h);
        const b = (__classPrivateFieldSet(_j = this.getInstance(), _test, (_k = +__classPrivateFieldGet(_j, _test)) - 1), _k);
        const c = __classPrivateFieldSet(_l = this.getInstance(), _test, +__classPrivateFieldGet(_l, _test) + 1);
        const d = __classPrivateFieldSet(_m = this.getInstance(), _test, +__classPrivateFieldGet(_m, _test) - 1);
        for (__classPrivateFieldSet(this.getInstance(), _test, 0); __classPrivateFieldGet(this.getInstance(), _test) < 10; __classPrivateFieldSet(_o = this.getInstance(), _test, +__classPrivateFieldGet(_o, _test) + 1)) { }
        for (__classPrivateFieldSet(this.getInstance(), _test, 0); __classPrivateFieldGet(this.getInstance(), _test) < 10; __classPrivateFieldSet(_p = this.getInstance(), _test, +__classPrivateFieldGet(_p, _test) + 1)) { }
    }
    getInstance() { return new C(); }
}
_test = new WeakMap();
