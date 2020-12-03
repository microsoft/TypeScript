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
var _foo, _foo_1;
class A {
    constructor() {
        _foo.set(this, void 0);
        __classPrivateFieldSet(this, _foo, 3);
    }
}
_foo = new WeakMap();
class B extends A {
    constructor() {
        super();
        _foo_1.set(this, void 0);
        __classPrivateFieldSet(this, _foo_1, "some string");
    }
}
_foo_1 = new WeakMap();
