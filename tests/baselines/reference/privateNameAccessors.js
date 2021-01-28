//// [privateNameAccessors.ts]
class A1 {
    get #prop() { return ""; }
    set #prop(param: string) { }

    get #roProp() { return ""; }

    constructor(name: string) {
        this.#prop = "";
        this.#roProp = ""; // Error
        console.log(this.#prop);
        console.log(this.#roProp);
    }
}


//// [privateNameAccessors.js]
"use strict";
var __classPrivateAccessorSet = (this && this.__classPrivateAccessorSet) || function (receiver, instances, fn, value) {
    if (!instances.has(receiver)) {
        throw new TypeError("attempted to set private accessor on non-instance");
    }
    return fn.call(receiver, value);
};
var __classPrivateReadonly = (this && this.__classPrivateReadonly) || function () {
    throw new TypeError("private element is not writable");
};
var __classPrivateAccessorGet = (this && this.__classPrivateAccessorGet) || function (receiver, instances, fn) {
    if (!instances.has(receiver)) {
        throw new TypeError("attempted to get private accessor on non-instance");
    }
    return fn.call(receiver);
};
var _A1_prop_get, _A1_prop_set, _A1_roProp_get, _A1_instances;
class A1 {
    constructor(name) {
        _A1_instances.add(this);
        __classPrivateAccessorSet(this, _A1_instances, _A1_prop_set, "");
        __classPrivateReadonly(this, ""); // Error
        console.log(__classPrivateAccessorGet(this, _A1_instances, _A1_prop_get));
        console.log(__classPrivateAccessorGet(this, _A1_instances, _A1_roProp_get));
    }
}
_A1_instances = new WeakSet(), _A1_prop_get = function _A1_prop_get() { return ""; }, _A1_prop_set = function _A1_prop_set(param) { }, _A1_roProp_get = function _A1_roProp_get() { return ""; };
