//// [privateNamesAndGenericClasses-2.ts]
class C<T> {
    #foo: T;
    #bar(): T {
      return this.#foo;
    }
    constructor(t: T) {
      this.#foo = t;
      t = this.#bar();
    }
    set baz(t: T) {
      this.#foo = t;

    }
    get baz(): T {
      return this.#foo;
    }
}

let a = new C(3);
let b = new C("hello");

a.baz = 5                                 // OK
const x: number = a.baz                   // OK
a.#foo;                                   // Error
a = b;                                    // Error
b = a;                                    // Error


//// [privateNamesAndGenericClasses-2.js]
"use strict";
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
};
var __classPrivateMethodGet = (this && this.__classPrivateMethodGet) || function (receiver, instances, fn) {
    if (!instances.has(receiver)) {
        throw new TypeError("attempted to get private method on non-instance");
    }
    return fn;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
};
var _C_foo, _C_bar, _C_instances;
class C {
    constructor(t) {
        _C_instances.add(this);
        _C_foo.set(this, void 0);
        __classPrivateFieldSet(this, _C_foo, t);
        t = __classPrivateMethodGet(this, _C_instances, _C_bar).call(this);
    }
    set baz(t) {
        __classPrivateFieldSet(this, _C_foo, t);
    }
    get baz() {
        return __classPrivateFieldGet(this, _C_foo);
    }
}
_C_foo = new WeakMap(), _C_instances = new WeakSet(), _C_bar = function _C_bar() {
    return __classPrivateFieldGet(this, _C_foo);
};
let a = new C(3);
let b = new C("hello");
a.baz = 5; // OK
const x = a.baz; // OK
a.; // Error
a = b; // Error
b = a; // Error
