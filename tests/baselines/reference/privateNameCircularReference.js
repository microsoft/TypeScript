//// [privateNameCircularReference.ts]
class A {
    #foo = this.#bar;
    #bar = this.#foo;
    ["#baz"] = this["#baz"]; // Error (should *not* be private name error)
}


//// [privateNameCircularReference.js]
"use strict";
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
};
var _A_foo, _A_bar;
class A {
    constructor() {
        _A_foo.set(this, __classPrivateFieldGet(this, _A_bar));
        _A_bar.set(this, __classPrivateFieldGet(this, _A_foo));
        this["#baz"] = this["#baz"]; // Error (should *not* be private name error)
    }
}
_A_foo = new WeakMap(), _A_bar = new WeakMap();
