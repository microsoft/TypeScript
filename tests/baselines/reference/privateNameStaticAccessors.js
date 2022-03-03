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
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _a, _A1_prop_get, _A1_prop_set, _A1_roProp_get;
class A1 {
    constructor(name) {
        __classPrivateFieldSet(A1, _a, "", "a", _A1_prop_set);
        __classPrivateFieldSet(A1, _a, "", "a"); // Error
        console.log(__classPrivateFieldGet(A1, _a, "a", _A1_prop_get));
        console.log(__classPrivateFieldGet(A1, _a, "a", _A1_roProp_get));
    }
}
_a = A1, _A1_prop_get = function _A1_prop_get() { return ""; }, _A1_prop_set = function _A1_prop_set(param) { }, _A1_roProp_get = function _A1_roProp_get() { return ""; };
