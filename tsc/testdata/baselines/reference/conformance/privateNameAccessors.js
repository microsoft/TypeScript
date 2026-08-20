//// [tests/cases/conformance/classes/members/privateNames/privateNameAccessors.ts] ////

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
var _A1_instances, _A1_prop_get, _A1_prop_set, _A1_roProp_get;
class A1 {
    constructor(name) {
        _A1_instances.add(this);
        __classPrivateFieldSet(this, _A1_instances, "", "a", _A1_prop_set);
        __classPrivateFieldSet(this, _A1_instances, "", "a"); // Error
        console.log(__classPrivateFieldGet(this, _A1_instances, "a", _A1_prop_get));
        console.log(__classPrivateFieldGet(this, _A1_instances, "a", _A1_roProp_get));
    }
}
_A1_instances = new WeakSet(), _A1_prop_get = function _A1_prop_get() { return ""; }, _A1_prop_set = function _A1_prop_set(param) { }, _A1_roProp_get = function _A1_roProp_get() { return ""; };
