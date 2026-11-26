//// [tests/cases/conformance/classes/members/privateNames/privateNameReadonly.ts] ////

//// [privateNameReadonly.ts]
const C = class {
    #bar() {}
    foo() {
        this.#bar = console.log("should log this then throw");
    }
}

console.log(new C().foo());


//// [privateNameReadonly.js]
"use strict";
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var _C_instances, _a, _C_bar;
const C = (_a = class {
        constructor() {
            _C_instances.add(this);
        }
        foo() {
            __classPrivateFieldSet(this, _C_instances, console.log("should log this then throw"), "m");
        }
    },
    _C_instances = new WeakSet(),
    _C_bar = function _C_bar() { },
    __setFunctionName(_a, "C"),
    _a);
console.log(new C().foo());
