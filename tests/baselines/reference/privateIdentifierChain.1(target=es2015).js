//// [tests/cases/conformance/expressions/optionalChaining/privateIdentifierChain/privateIdentifierChain.1.ts] ////

//// [privateIdentifierChain.1.ts]
class A {
    a?: A
    #b?: A;
    getA(): A {
        return new A();
    }
    constructor() {
        this.a = this;
        // None of these should error
        this?.#b;
        this?.a.#b;
        this?.getA().#b;
    }
}

class B {
    a?: A
    getA(): A {
        return new A();
    }
    constructor() {
        this.a = new A();
        this.a?.#b; // Error
        this?.a.#b; // Error
        this?.getA().#b; // Error
    }
}


//// [privateIdentifierChain.1.js]
"use strict";
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _A_b;
class A {
    getA() {
        return new A();
    }
    constructor() {
        _A_b.set(this, void 0);
        this.a = this;
        // None of these should error
        __classPrivateFieldGet(this, _A_b, "f");
        __classPrivateFieldGet(this === null || this === void 0 ? void 0 : this.a, _A_b, "f");
        __classPrivateFieldGet(this === null || this === void 0 ? void 0 : this.getA(), _A_b, "f");
    }
}
_A_b = new WeakMap();
class B {
    getA() {
        return new A();
    }
    constructor() {
        var _a;
        this.a = new A();
        (_a = this.a) === null || _a === void 0 ? void 0 : _a.; // Error
        this === null || this === void 0 ? void 0 : this.a.; // Error
        this === null || this === void 0 ? void 0 : this.getA().; // Error
    }
}
