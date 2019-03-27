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
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
};
var _foo;
class C {
    constructor(t) {
        _foo.set(this, void 0);
        __classPrivateFieldSet(this, _foo, t);
        t = this..call(this);
    }
    () {
        return __classPrivateFieldGet(this, _foo);
    }
    set baz(t) {
        __classPrivateFieldSet(this, _foo, t);
    }
    get baz() {
        return __classPrivateFieldGet(this, _foo);
    }
}
_foo = new WeakMap();
let a = new C(3);
let b = new C("hello");
a.baz = 5; // OK
const x = a.baz; // OK
a.; // Error
a = b; // Error
b = a; // Error
