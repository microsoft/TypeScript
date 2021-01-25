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
var __classPrivateMethodGet = (this && this.__classPrivateMethodGet) || function (receiver, accessCheck, fn) {
    if (!accessCheck.has(receiver)) {
        throw new TypeError("attempted to get private method on non-instance");
    }
    return fn;
};
var _method, _method_1;
class A1 {
    constructor(name) {
        _method.add(this);
        __classPrivateMethodGet(this, _method, _method_1).call(this, "");
        __classPrivateMethodGet(this, _method, _method_1).call(this, 1); // Error
        __classPrivateMethodGet(this, _method, _method_1).call(// Error
        this); // Error 
    }
}
_method = new WeakSet(), _method_1 = function _method_1(param) {
    return "";
};
