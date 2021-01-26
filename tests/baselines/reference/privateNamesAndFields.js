//// [privateNamesAndFields.ts]
class A {
    #foo: number;
    constructor () {
        this.#foo = 3;
    }
}

class B extends A {
    #foo: string;
    constructor () {
        super();
        this.#foo = "some string";
    }
}


//// [privateNamesAndFields.js]
"use strict";
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
};
var _A_foo, _B_foo;
class A {
    constructor() {
        _A_foo.set(this, void 0);
        __classPrivateFieldSet(this, _A_foo, 3);
    }
}
_A_foo = new WeakMap();
class B extends A {
    constructor() {
        super();
        _B_foo.set(this, void 0);
        __classPrivateFieldSet(this, _B_foo, "some string");
    }
}
_B_foo = new WeakMap();
