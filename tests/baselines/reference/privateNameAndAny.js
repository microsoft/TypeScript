//// [privateNameAndAny.ts]
class A {
    #foo = true;
    static #baz = 10;
    static #m() {}
    method(thing: any) {
        thing.#foo; // OK
        thing.#m();
        thing.#baz;
        thing.#bar; // Error
        thing.#foo();
    }
    methodU(thing: unknown) {
        thing.#foo;
        thing.#m();
        thing.#baz;
        thing.#bar;
        thing.#foo();
    }
    methodN(thing: never) {
        thing.#foo;
        thing.#m();
        thing.#baz;
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
var __classStaticPrivateFieldGet = (this && this.__classStaticPrivateFieldGet) || function (receiver, classConstructor, propertyDescriptor) {
    if (receiver !== classConstructor) {
        throw new TypeError("Private static access of wrong provenance");
    }
    if (propertyDescriptor === undefined) {
        throw new TypeError("Private static field was accessed before its declaration.");
    }
    return propertyDescriptor.value;
};
var _a, _A_foo, _A_baz, _A_m;
class A {
    constructor() {
        _A_foo.set(this, true);
    }
    method(thing) {
        __classPrivateFieldGet(thing, _A_foo); // OK
        __classStaticPrivateMethodGet(thing, _a, _A_m).call(// OK
        thing);
        __classStaticPrivateFieldGet(thing, _a, _A_baz);
        thing.; // Error
        __classPrivateFieldGet(thing, _A_foo).call(// Error
        thing);
    }
    methodU(thing) {
        __classPrivateFieldGet(thing, _A_foo);
        __classStaticPrivateMethodGet(thing, _a, _A_m).call(thing);
        __classStaticPrivateFieldGet(thing, _a, _A_baz);
        thing.;
        __classPrivateFieldGet(thing, _A_foo).call(thing);
    }
    methodN(thing) {
        __classPrivateFieldGet(thing, _A_foo);
        __classStaticPrivateMethodGet(thing, _a, _A_m).call(thing);
        __classStaticPrivateFieldGet(thing, _a, _A_baz);
        thing.;
        __classPrivateFieldGet(thing, _A_foo).call(thing);
    }
}
_a = A, _A_foo = new WeakMap(), _A_m = function _A_m() { };
_A_baz = { value: 10 };
;
