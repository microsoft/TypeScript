//// [tests/cases/conformance/classes/members/privateNames/privateNameStaticMethod.ts] ////

//// [privateNameStaticMethod.ts]
class A1 {
    static #method(param: string): string {
        return "";
    }
    constructor() {
        A1.#method("")
        A1.#method(1) // Error
        A1.#method()  // Error 

    }
}


//// [privateNameStaticMethod.js]
"use strict";
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _a, _A1_method;
class A1 {
    constructor() {
        __classPrivateFieldGet(_a, _a, "m", _A1_method).call(_a, "");
        __classPrivateFieldGet(_a, _a, "m", _A1_method).call(_a, 1); // Error
        __classPrivateFieldGet(_a, _a, "m", _A1_method).call(_a); // Error 
    }
}
_a = A1, _A1_method = function _A1_method(param) {
    return "";
};
