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
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _a, _A_foo, _A_bar, _b, _B_foo;
class A {
    constructor() {
        __classPrivateFieldSet(A, _a, 3, "f", _A_foo);
        __classPrivateFieldGet(B, _a, "f", _A_foo); // Error
        __classPrivateFieldGet(B, _a, "f", _A_bar); // Error
    }
}
_a = A;
_A_foo = { value: void 0 };
_A_bar = { value: void 0 };
class B extends A {
    constructor() {
        super();
        __classPrivateFieldSet(B, _b, "some string", "f", _B_foo);
    }
}
_b = B;
_B_foo = { value: void 0 };
// We currently filter out static private identifier fields in `getUnmatchedProperties`.
// We will need a more robust solution when we support static fields
const willErrorSomeDay = class {
}; // OK for now
