//// [privateNamesNoDelete.ts]
class A {
    #v = 1;
    constructor() {
        delete this.#v; // Error: The operand of a delete operator cannot be a private name.
    }
}


//// [privateNamesNoDelete.js]
"use strict";
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _A_v;
class A {
    constructor() {
        _A_v.set(this, 1);
        delete __classPrivateFieldGet(this, _A_v, "f"); // Error: The operand of a delete operator cannot be a private name.
    }
}
_A_v = new WeakMap();
