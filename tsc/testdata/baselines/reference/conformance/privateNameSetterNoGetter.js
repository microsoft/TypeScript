//// [tests/cases/conformance/classes/members/privateNames/privateNameSetterNoGetter.ts] ////

//// [privateNameSetterNoGetter.ts]
const C = class {
    set #x(x) {}
    m() {
        this.#x += 2; // Error
    }
}

console.log(new C().m());


//// [privateNameSetterNoGetter.js]
"use strict";
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var _C_instances, _a, _C_x_set;
const C = (_a = class {
        constructor() {
            _C_instances.add(this);
        }
        m() {
            __classPrivateFieldSet(this, _C_instances, __classPrivateFieldGet(this, _C_instances, "a") + 2, "a", _C_x_set); // Error
        }
    },
    _C_instances = new WeakSet(),
    _C_x_set = function _C_x_set(x) { },
    __setFunctionName(_a, "C"),
    _a);
console.log(new C().m());
