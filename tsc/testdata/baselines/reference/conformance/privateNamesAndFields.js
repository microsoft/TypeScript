//// [tests/cases/conformance/classes/members/privateNames/privateNamesAndFields.ts] ////

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
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var _A_foo, _B_foo;
class A {
    constructor() {
        _A_foo.set(this, void 0);
        __classPrivateFieldSet(this, _A_foo, 3, "f");
    }
}
_A_foo = new WeakMap();
class B extends A {
    constructor() {
        super();
        _B_foo.set(this, void 0);
        __classPrivateFieldSet(this, _B_foo, "some string", "f");
    }
}
_B_foo = new WeakMap();
