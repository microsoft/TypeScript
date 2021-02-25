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
var __classStaticPrivateFieldGet = (this && this.__classStaticPrivateFieldGet) || function (receiver, classConstructor, propertyDescriptor) {
    if (receiver !== classConstructor) {
        throw new TypeError("Private static access of wrong provenance");
    }
    if (propertyDescriptor === undefined) {
        throw new TypeError("Private static field was accessed before its declaration.");
    }
    return propertyDescriptor.value;
};
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
var _C_test;
class C {
    constructor() {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
        __classStaticPrivateFieldSet(_a = C, C, _C_test, +__classStaticPrivateFieldGet(_a, C, _C_test) + 1);
        __classStaticPrivateFieldSet(_b = C, C, _C_test, +__classStaticPrivateFieldGet(_b, C, _C_test) - 1);
        __classStaticPrivateFieldSet(_c = C, C, _C_test, +__classStaticPrivateFieldGet(_c, C, _C_test) + 1);
        __classStaticPrivateFieldSet(_d = C, C, _C_test, +__classStaticPrivateFieldGet(_d, C, _C_test) - 1);
        const a = (__classStaticPrivateFieldSet(_e = C, C, _C_test, (_f = +__classStaticPrivateFieldGet(_e, C, _C_test)) + 1), _f);
        const b = (__classStaticPrivateFieldSet(_g = C, C, _C_test, (_h = +__classStaticPrivateFieldGet(_g, C, _C_test)) - 1), _h);
        const c = __classStaticPrivateFieldSet(_j = C, C, _C_test, +__classStaticPrivateFieldGet(_j, C, _C_test) + 1);
        const d = __classStaticPrivateFieldSet(_k = C, C, _C_test, +__classStaticPrivateFieldGet(_k, C, _C_test) - 1);
        for (__classStaticPrivateFieldSet(C, C, _C_test, 0); __classStaticPrivateFieldGet(C, C, _C_test) < 10; __classStaticPrivateFieldSet(_l = C, C, _C_test, +__classStaticPrivateFieldGet(_l, C, _C_test) + 1)) { }
        for (__classStaticPrivateFieldSet(C, C, _C_test, 0); __classStaticPrivateFieldGet(C, C, _C_test) < 10; __classStaticPrivateFieldSet(_m = C, C, _C_test, +__classStaticPrivateFieldGet(_m, C, _C_test) + 1)) { }
    }
    test() {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
        __classStaticPrivateFieldSet(_a = this.getClass(), C, _C_test, +__classStaticPrivateFieldGet(_a, C, _C_test) + 1);
        __classStaticPrivateFieldSet(_b = this.getClass(), C, _C_test, +__classStaticPrivateFieldGet(_b, C, _C_test) - 1);
        __classStaticPrivateFieldSet(_c = this.getClass(), C, _C_test, +__classStaticPrivateFieldGet(_c, C, _C_test) + 1);
        __classStaticPrivateFieldSet(_d = this.getClass(), C, _C_test, +__classStaticPrivateFieldGet(_d, C, _C_test) - 1);
        const a = (__classStaticPrivateFieldSet(_e = this.getClass(), C, _C_test, (_f = +__classStaticPrivateFieldGet(_e, C, _C_test)) + 1), _f);
        const b = (__classStaticPrivateFieldSet(_g = this.getClass(), C, _C_test, (_h = +__classStaticPrivateFieldGet(_g, C, _C_test)) - 1), _h);
        const c = __classStaticPrivateFieldSet(_j = this.getClass(), C, _C_test, +__classStaticPrivateFieldGet(_j, C, _C_test) + 1);
        const d = __classStaticPrivateFieldSet(_k = this.getClass(), C, _C_test, +__classStaticPrivateFieldGet(_k, C, _C_test) - 1);
        for (__classStaticPrivateFieldSet(this.getClass(), C, _C_test, 0); __classStaticPrivateFieldGet(this.getClass(), C, _C_test) < 10; __classStaticPrivateFieldSet(_l = this.getClass(), C, _C_test, +__classStaticPrivateFieldGet(_l, C, _C_test) + 1)) { }
        for (__classStaticPrivateFieldSet(this.getClass(), C, _C_test, 0); __classStaticPrivateFieldGet(this.getClass(), C, _C_test) < 10; __classStaticPrivateFieldSet(_m = this.getClass(), C, _C_test, +__classStaticPrivateFieldGet(_m, C, _C_test) + 1)) { }
    }
    getClass() { return C; }
}
_C_test = { value: 24 };
