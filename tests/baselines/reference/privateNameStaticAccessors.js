//// [privateNameStaticAccessors.ts]
class A1 {
    static get #prop() { return ""; }
    static set #prop(param: string) { }

    static get #roProp() { return ""; }

    constructor(name: string) {
        A1.#prop = "";
        A1.#roProp = ""; // Error
        console.log(A1.#prop);
        console.log(A1.#roProp);
    }
}


//// [privateNameStaticAccessors.js]
"use strict";
var __classStaticPrivateAccessorSet = (this && this.__classStaticPrivateAccessorSet) || function (receiver, classConstructor, fn, value) {
    if (receiver !== classConstructor) {
        throw new TypeError("Private static access of wrong provenance");
    }
    fn.call(receiver, value);
    return value;
};
var __classStaticPrivateReadonly = (this && this.__classStaticPrivateReadonly) || function () {
    throw new TypeError("Private static element is not writable");
};
var __classStaticPrivateAccessorGet = (this && this.__classStaticPrivateAccessorGet) || function (receiver, classConstructor, fn) {
    if (receiver !== classConstructor) {
        throw new TypeError("Private static access of wrong provenance");
    }
    return fn.call(receiver);
};
var _a, _A1_prop_get, _A1_prop_set, _A1_roProp_get;
class A1 {
    constructor(name) {
        __classStaticPrivateAccessorSet(A1, _a, _A1_prop_set, "");
        __classStaticPrivateReadonly(A1, ""); // Error
        console.log(__classStaticPrivateAccessorGet(A1, _a, _A1_prop_get));
        console.log(__classStaticPrivateAccessorGet(A1, _a, _A1_roProp_get));
    }
}
_a = A1, _A1_prop_get = function _A1_prop_get() { return ""; }, _A1_prop_set = function _A1_prop_set(param) { }, _A1_roProp_get = function _A1_roProp_get() { return ""; };
