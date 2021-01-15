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
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
};
var _method;
class A1 {
    constructor(name) {
        __classPrivateFieldGet(this, _method).call(this, "");
        __classPrivateFieldGet(this, _method).call(this, 1); // Error
        __classPrivateFieldGet(this, _method).call(// Error
        this); // Error 
    }
    (param) {
        return "";
    }
}
_method = new WeakMap();
