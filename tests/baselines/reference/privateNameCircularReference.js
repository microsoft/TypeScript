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
var _foo, _bar;
class A {
    constructor() {
        _foo.set(this, __classPrivateFieldGet(this, _bar));
        _bar.set(this, __classPrivateFieldGet(this, _foo));
        this["#baz"] = this["#baz"]; // Error (should *not* be private name error)
    }
}
_foo = new WeakMap(), _bar = new WeakMap();
