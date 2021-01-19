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
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
};
var _prop, _prop_1, _roProp;
class A1 {
    constructor(name) {
        __classPrivateFieldSet(this, _prop_1, "");
        __classPrivateFieldSet(this, _roProp, ""); // Error
        console.log(__classPrivateFieldGet(this, _prop_1));
        console.log(__classPrivateFieldGet(this, _roProp));
    }
    get () { return ""; }
    set (param) { }
    get () { return ""; }
}
_prop = new WeakMap(), _prop_1 = new WeakMap(), _roProp = new WeakMap();
