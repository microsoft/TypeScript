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
var __classPrivateMethodGet = (this && this.__classPrivateMethodGet) || function (receiver, instances, fn) {
    if (!instances.has(receiver)) {
        throw new TypeError("attempted to get private method on non-instance");
    }
    return fn;
};
var _A1_method, _A1_instances;
class A1 {
    constructor(name) {
        _A1_instances.add(this);
        __classPrivateMethodGet(this, _A1_instances, _A1_method).call(this, "");
        __classPrivateMethodGet(this, _A1_instances, _A1_method).call(this, 1); // Error
        __classPrivateMethodGet(this, _A1_instances, _A1_method).call(// Error
        this); // Error 
    }
}
_A1_instances = new WeakSet(), _A1_method = function _A1_method(param) {
    return "";
};
