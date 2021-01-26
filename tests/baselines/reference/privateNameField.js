//// [privateNameField.ts]
class A {
    #name: string;
    constructor(name: string) {
        this.#name = name;
    }
}


//// [privateNameField.js]
"use strict";
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
};
var _A_name;
class A {
    constructor(name) {
        _A_name.set(this, void 0);
        __classPrivateFieldSet(this, _A_name, name);
    }
}
_A_name = new WeakMap();
