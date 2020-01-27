//// [privateNameAndAny.ts]
class A {
    #foo = true; 
    method(thing: any) {
        thing.#foo; // OK
        thing.#bar; // Error
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
    }
}
_foo = new WeakMap();
;
