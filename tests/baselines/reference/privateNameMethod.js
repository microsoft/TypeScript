//// [tests/cases/conformance/classes/members/privateNames/privateNameMethod.ts] ////

//// [privateNameMethod.ts]
class A1 {
    #method(param: string): string {
        return "";
    }
    constructor(name: string) {
        this.#method("")
        this.#method(1) // Error
        this.#method()  // Error 

    }
}


//// [privateNameMethod.js]
"use strict";
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _A1_instances, _A1_method;
class A1 {
    constructor(name) {
        _A1_instances.add(this);
        __classPrivateFieldGet(this, _A1_instances, "m", _A1_method).call(this, "");
        __classPrivateFieldGet(this, _A1_instances, "m", _A1_method).call(this, 1); // Error
        __classPrivateFieldGet(this, _A1_instances, "m", _A1_method).call(this); // Error 
    }
}
_A1_instances = new WeakSet(), _A1_method = function _A1_method(param) {
    return "";
};
