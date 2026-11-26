//// [tests/cases/compiler/classNameReferencesInStaticElements.ts] ////

//// [classNameReferencesInStaticElements.ts]
// https://github.com/microsoft/TypeScript/issues/54607
class Foo {
    static { console.log(this, Foo) }
    static x = () => { console.log(this, Foo) }
    static y = function(this: unknown) { console.log(this, Foo) }

    #x() { console.log(Foo); }
    x() { this.#x(); }
}

const oldFoo = Foo;
(Foo as any) = null;
oldFoo.x();
oldFoo.y();
new oldFoo().x();

//// [classNameReferencesInStaticElements.js]
"use strict";
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
var _Foo_instances, _a, _Foo_x;
// https://github.com/microsoft/TypeScript/issues/54607
class Foo {
    constructor() {
        _Foo_instances.add(this);
    }
    x() { __classPrivateFieldGet(this, _Foo_instances, "m", _Foo_x).call(this); }
}
_a = Foo, _Foo_instances = new WeakSet(), _Foo_x = function _Foo_x() { console.log(_a); };
(() => {
    console.log(_a, _a);
})();
Foo.x = __setFunctionName(() => { console.log(_a, _a); }, "x");
Foo.y = __setFunctionName(function () { console.log(this, _a); }, "y");
const oldFoo = Foo;
Foo = null;
oldFoo.x();
oldFoo.y();
new oldFoo().x();
