//// [tests/cases/conformance/classes/members/privateNames/privateNameMethodClassExpression.ts] ////

//// [privateNameMethodClassExpression.ts]
const C = class {
    #field = this.#method();
    #method() { return 42; }
    static getInstance() { return new C(); }
    getField() { return this.#field };
}

console.log(C.getInstance().getField());
C.getInstance().#method; // Error
C.getInstance().#field; // Error



//// [privateNameMethodClassExpression.js]
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
var _C_instances, _a, _C_field, _C_method;
const C = (_a = class {
        constructor() {
            _C_instances.add(this);
            _C_field.set(this, __classPrivateFieldGet(this, _C_instances, "m", _C_method).call(this));
        }
        static getInstance() { return new C(); }
        getField() { return __classPrivateFieldGet(this, _C_field, "f"); }
        ;
    },
    _C_field = new WeakMap(),
    _C_instances = new WeakSet(),
    _C_method = function _C_method() { return 42; },
    __setFunctionName(_a, "C"),
    _a);
console.log(C.getInstance().getField());
C.getInstance().; // Error
C.getInstance().; // Error
