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
        var _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o;
        __classPrivateFieldSet(_b = C, _a, +__classPrivateFieldGet(_b, _a, "f", _C_test) + 1, "f", _C_test);
        __classPrivateFieldSet(_c = C, _a, +__classPrivateFieldGet(_c, _a, "f", _C_test) - 1, "f", _C_test);
        __classPrivateFieldSet(_d = C, _a, +__classPrivateFieldGet(_d, _a, "f", _C_test) + 1, "f", _C_test);
        __classPrivateFieldSet(_e = C, _a, +__classPrivateFieldGet(_e, _a, "f", _C_test) - 1, "f", _C_test);
        const a = (__classPrivateFieldSet(_f = C, _a, (_g = +__classPrivateFieldGet(_f, _a, "f", _C_test)) + 1, "f", _C_test), _g);
        const b = (__classPrivateFieldSet(_h = C, _a, (_j = +__classPrivateFieldGet(_h, _a, "f", _C_test)) - 1, "f", _C_test), _j);
        const c = __classPrivateFieldSet(_k = C, _a, +__classPrivateFieldGet(_k, _a, "f", _C_test) + 1, "f", _C_test);
        const d = __classPrivateFieldSet(_l = C, _a, +__classPrivateFieldGet(_l, _a, "f", _C_test) - 1, "f", _C_test);
        for (__classPrivateFieldSet(C, _a, 0, "f", _C_test); __classPrivateFieldGet(C, _a, "f", _C_test) < 10; __classPrivateFieldSet(_m = C, _a, +__classPrivateFieldGet(_m, _a, "f", _C_test) + 1, "f", _C_test)) { }
        for (__classPrivateFieldSet(C, _a, 0, "f", _C_test); __classPrivateFieldGet(C, _a, "f", _C_test) < 10; __classPrivateFieldSet(_o = C, _a, +__classPrivateFieldGet(_o, _a, "f", _C_test) + 1, "f", _C_test)) { }
    }
    test() {
        var _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o;
        __classPrivateFieldSet(_b = this.getClass(), _a, +__classPrivateFieldGet(_b, _a, "f", _C_test) + 1, "f", _C_test);
        __classPrivateFieldSet(_c = this.getClass(), _a, +__classPrivateFieldGet(_c, _a, "f", _C_test) - 1, "f", _C_test);
        __classPrivateFieldSet(_d = this.getClass(), _a, +__classPrivateFieldGet(_d, _a, "f", _C_test) + 1, "f", _C_test);
        __classPrivateFieldSet(_e = this.getClass(), _a, +__classPrivateFieldGet(_e, _a, "f", _C_test) - 1, "f", _C_test);
        const a = (__classPrivateFieldSet(_f = this.getClass(), _a, (_g = +__classPrivateFieldGet(_f, _a, "f", _C_test)) + 1, "f", _C_test), _g);
        const b = (__classPrivateFieldSet(_h = this.getClass(), _a, (_j = +__classPrivateFieldGet(_h, _a, "f", _C_test)) - 1, "f", _C_test), _j);
        const c = __classPrivateFieldSet(_k = this.getClass(), _a, +__classPrivateFieldGet(_k, _a, "f", _C_test) + 1, "f", _C_test);
        const d = __classPrivateFieldSet(_l = this.getClass(), _a, +__classPrivateFieldGet(_l, _a, "f", _C_test) - 1, "f", _C_test);
        for (__classPrivateFieldSet(this.getClass(), _a, 0, "f", _C_test); __classPrivateFieldGet(this.getClass(), _a, "f", _C_test) < 10; __classPrivateFieldSet(_m = this.getClass(), _a, +__classPrivateFieldGet(_m, _a, "f", _C_test) + 1, "f", _C_test)) { }
        for (__classPrivateFieldSet(this.getClass(), _a, 0, "f", _C_test); __classPrivateFieldGet(this.getClass(), _a, "f", _C_test) < 10; __classPrivateFieldSet(_o = this.getClass(), _a, +__classPrivateFieldGet(_o, _a, "f", _C_test) + 1, "f", _C_test)) { }
    }
    getClass() { return C; }
}
_a = C;
_C_test = { value: 24 };
