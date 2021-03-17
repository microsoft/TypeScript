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
var __classStaticPrivateFieldSet = (this && this.__classStaticPrivateFieldSet) || function (receiver, classConstructor, propertyDescriptor, value) {
    if (receiver !== classConstructor) {
        throw new TypeError("Private static access of wrong provenance");
    }
    if (propertyDescriptor === undefined) {
        throw new TypeError("Private static field was accessed before its declaration.");
    }
    propertyDescriptor.value = value;
    return value;
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
var _a, _A_foo, _A_bar, _b, _B_foo;
class A {
    constructor() {
        __classStaticPrivateFieldSet(A, _a, _A_foo, 3);
        __classStaticPrivateFieldGet(B, _a, _A_foo); // Error
        __classStaticPrivateFieldGet(B, _a, _A_bar); // Error
    }
}
_a = A;
_A_foo = { value: void 0 };
_A_bar = { value: void 0 };
class B extends A {
    constructor() {
        super();
        __classStaticPrivateFieldSet(B, _b, _B_foo, "some string");
    }
}
_b = B;
_B_foo = { value: void 0 };
// We currently filter out static private identifier fields in `getUnmatchedProperties`.
// We will need a more robust solution when we support static fields
const willErrorSomeDay = class {
}; // OK for now
