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
var _A_foo, _A_bar, _B_foo;
class A {
    constructor() {
        __classPrivateFieldSet(A, _A_foo, 3);
        __classPrivateFieldGet(B, _A_foo); // Error
        __classPrivateFieldGet(B, _A_bar); // Error
    }
}
_A_foo = new WeakMap(), _A_bar = new WeakMap();
class B extends A {
    constructor() {
        super();
        __classPrivateFieldSet(B, _B_foo, "some string");
    }
}
_B_foo = new WeakMap();
// We currently filter out static private identifier fields in `getUnmatchedProperties`.
// We will need a more robust solution when we support static fields
const willErrorSomeDay = class {
}; // OK for now
