//// [privateNamesNoDelete.ts]
class A {
    #v = 1;
    constructor() {
        delete this.#v; // Error: The operand of a delete operator cannot be a private name.
    }
}


//// [privateNamesNoDelete.js]
"use strict";
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
};
var _v;
class A {
    constructor() {
        _v.set(this, 1);
        delete __classPrivateFieldGet(this, _v); // Error: The operand of a delete operator cannot be a private name.
    }
}
_v = new WeakMap();
