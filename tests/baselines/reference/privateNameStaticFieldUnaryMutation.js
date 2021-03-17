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
var _a, _C_test;
class C {
    constructor() {
        var _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o;
        __classStaticPrivateFieldSet(_b = C, _a, _C_test, +__classStaticPrivateFieldGet(_b, _a, _C_test) + 1);
        __classStaticPrivateFieldSet(_c = C, _a, _C_test, +__classStaticPrivateFieldGet(_c, _a, _C_test) - 1);
        __classStaticPrivateFieldSet(_d = C, _a, _C_test, +__classStaticPrivateFieldGet(_d, _a, _C_test) + 1);
        __classStaticPrivateFieldSet(_e = C, _a, _C_test, +__classStaticPrivateFieldGet(_e, _a, _C_test) - 1);
        const a = (__classStaticPrivateFieldSet(_f = C, _a, _C_test, (_g = +__classStaticPrivateFieldGet(_f, _a, _C_test)) + 1), _g);
        const b = (__classStaticPrivateFieldSet(_h = C, _a, _C_test, (_j = +__classStaticPrivateFieldGet(_h, _a, _C_test)) - 1), _j);
        const c = __classStaticPrivateFieldSet(_k = C, _a, _C_test, +__classStaticPrivateFieldGet(_k, _a, _C_test) + 1);
        const d = __classStaticPrivateFieldSet(_l = C, _a, _C_test, +__classStaticPrivateFieldGet(_l, _a, _C_test) - 1);
        for (__classStaticPrivateFieldSet(C, _a, _C_test, 0); __classStaticPrivateFieldGet(C, _a, _C_test) < 10; __classStaticPrivateFieldSet(_m = C, _a, _C_test, +__classStaticPrivateFieldGet(_m, _a, _C_test) + 1)) { }
        for (__classStaticPrivateFieldSet(C, _a, _C_test, 0); __classStaticPrivateFieldGet(C, _a, _C_test) < 10; __classStaticPrivateFieldSet(_o = C, _a, _C_test, +__classStaticPrivateFieldGet(_o, _a, _C_test) + 1)) { }
    }
    test() {
        var _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o;
        __classStaticPrivateFieldSet(_b = this.getClass(), _a, _C_test, +__classStaticPrivateFieldGet(_b, _a, _C_test) + 1);
        __classStaticPrivateFieldSet(_c = this.getClass(), _a, _C_test, +__classStaticPrivateFieldGet(_c, _a, _C_test) - 1);
        __classStaticPrivateFieldSet(_d = this.getClass(), _a, _C_test, +__classStaticPrivateFieldGet(_d, _a, _C_test) + 1);
        __classStaticPrivateFieldSet(_e = this.getClass(), _a, _C_test, +__classStaticPrivateFieldGet(_e, _a, _C_test) - 1);
        const a = (__classStaticPrivateFieldSet(_f = this.getClass(), _a, _C_test, (_g = +__classStaticPrivateFieldGet(_f, _a, _C_test)) + 1), _g);
        const b = (__classStaticPrivateFieldSet(_h = this.getClass(), _a, _C_test, (_j = +__classStaticPrivateFieldGet(_h, _a, _C_test)) - 1), _j);
        const c = __classStaticPrivateFieldSet(_k = this.getClass(), _a, _C_test, +__classStaticPrivateFieldGet(_k, _a, _C_test) + 1);
        const d = __classStaticPrivateFieldSet(_l = this.getClass(), _a, _C_test, +__classStaticPrivateFieldGet(_l, _a, _C_test) - 1);
        for (__classStaticPrivateFieldSet(this.getClass(), _a, _C_test, 0); __classStaticPrivateFieldGet(this.getClass(), _a, _C_test) < 10; __classStaticPrivateFieldSet(_m = this.getClass(), _a, _C_test, +__classStaticPrivateFieldGet(_m, _a, _C_test) + 1)) { }
        for (__classStaticPrivateFieldSet(this.getClass(), _a, _C_test, 0); __classStaticPrivateFieldGet(this.getClass(), _a, _C_test) < 10; __classStaticPrivateFieldSet(_o = this.getClass(), _a, _C_test, +__classStaticPrivateFieldGet(_o, _a, _C_test) + 1)) { }
    }
    getClass() { return C; }
}
_a = C;
_C_test = { value: 24 };
