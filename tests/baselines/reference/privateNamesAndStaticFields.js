//// [privateNamesAndStaticFields.ts]
class A {
    static #foo: number;
    static #bar: number;
    constructor () {
        A.#foo = 3;
        B.#foo; // Error
        B.#bar; // Error
    }
}

class B extends A {
    static #foo: string;
    constructor () {
        super();
        B.#foo = "some string";
    }
}

// We currently filter out static private identifier fields in `getUnmatchedProperties`.
// We will need a more robust solution when we support static fields
const willErrorSomeDay: typeof A = class {}; // OK for now


//// [privateNamesAndStaticFields.js]
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
var _foo, _bar, _foo_1;
class A {
    constructor() {
        __classPrivateFieldSet(A, _foo, 3);
        __classPrivateFieldGet(B, _foo); // Error
        __classPrivateFieldGet(B, _bar); // Error
    }
}
_foo = new WeakMap(), _bar = new WeakMap();
class B extends A {
    constructor() {
        super();
        __classPrivateFieldSet(B, _foo_1, "some string");
    }
}
_foo_1 = new WeakMap();
// We currently filter out static private identifier fields in `getUnmatchedProperties`.
// We will need a more robust solution when we support static fields
const willErrorSomeDay = class {
}; // OK for now
