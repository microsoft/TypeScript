//// [privateNameAndAny.ts]
class A {
    #foo = true; 
    method(thing: any) {
        thing.#foo; // OK
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
var _foo;
class A {
    constructor() {
        _foo.set(this, true);
    }
    method(thing) {
        __classPrivateFieldGet(thing, _foo); // OK
        thing.; // Error
        __classPrivateFieldGet(thing, _foo).call(// Error
        thing);
    }
    methodU(thing) {
        __classPrivateFieldGet(thing, _foo);
        thing.;
        __classPrivateFieldGet(thing, _foo).call(thing);
    }
    methodN(thing) {
        __classPrivateFieldGet(thing, _foo);
        thing.;
        __classPrivateFieldGet(thing, _foo).call(thing);
    }
}
_foo = new WeakMap();
;
