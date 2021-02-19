//// [privateNameAndAny.ts]
class A {
    #foo = true;
    static #baz = 10;
    static #m() {}
    method(thing: any) {
        thing.#foo; // OK
        thing.#m();
        thing.#bar;
        thing.#bar; // Error
        thing.#foo();
    }
    methodU(thing: unknown) {
        thing.#foo;
        thing.#bar;
        thing.#foo();
    }
    methodN(thing: never) {
        thing.#foo;
        thing.#bar;
        thing.#foo();
    }
};


//// [privateNameAndAny.js]
"use strict";
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
};
var __classStaticPrivateMethodGet = (this && this.__classStaticPrivateMethodGet) || function (receiver, classConstructor, fn) {
    if (receiver !== classConstructor) {
        throw new TypeError("Private static access of wrong provenance");
    }
    return fn;
};
var _A_foo, _A_baz, _A_m;
class A {
    constructor() {
        _A_foo.set(this, true);
    }
    method(thing) {
        __classPrivateFieldGet(thing, _A_foo); // OK
        __classStaticPrivateMethodGet(thing, A, _A_m).call(// OK
        thing);
        thing.;
        thing.; // Error
        __classPrivateFieldGet(thing, _A_foo).call(// Error
        thing);
    }
    methodU(thing) {
        __classPrivateFieldGet(thing, _A_foo);
        thing.;
        __classPrivateFieldGet(thing, _A_foo).call(thing);
    }
    methodN(thing) {
        __classPrivateFieldGet(thing, _A_foo);
        thing.;
        __classPrivateFieldGet(thing, _A_foo).call(thing);
    }
}
_A_foo = new WeakMap(), _A_m = function _A_m() { };
_A_baz = { value: 10 };
;
