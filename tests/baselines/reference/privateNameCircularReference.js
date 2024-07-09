//// [tests/cases/conformance/classes/members/privateNames/privateNameCircularReference.ts] ////

//// [privateNameCircularReference.ts]
class A {
    #foo = this.#bar;
    #bar = this.#foo;
    ["#baz"] = this["#baz"]; // Error (should *not* be private name error)
}


//// [privateNameCircularReference.js]
"use strict";
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _A_foo, _A_bar;
class A {
    constructor() {
        _A_foo.set(this, __classPrivateFieldGet(this, _A_bar, "f"));
        _A_bar.set(this, __classPrivateFieldGet(this, _A_foo, "f"));
        this["#baz"] = this["#baz"]; // Error (should *not* be private name error)
    }
}
_A_foo = new WeakMap(), _A_bar = new WeakMap();
