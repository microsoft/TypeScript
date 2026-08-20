//// [tests/cases/conformance/classes/members/privateNames/privateNameAndAny.ts] ////

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
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _a, _A_foo, _A_baz, _A_m;
class A {
    constructor() {
        _A_foo.set(this, true);
    }
    method(thing) {
        __classPrivateFieldGet(thing, _A_foo, "f"); // OK
        __classPrivateFieldGet(thing, _a, "m", _A_m).call(thing);
        __classPrivateFieldGet(thing, _a, "f", _A_baz);
        thing.; // Error
        __classPrivateFieldGet(thing, _A_foo, "f").call(thing);
    }
    methodU(thing) {
        __classPrivateFieldGet(thing, _A_foo, "f");
        __classPrivateFieldGet(thing, _a, "m", _A_m).call(thing);
        __classPrivateFieldGet(thing, _a, "f", _A_baz);
        thing.;
        __classPrivateFieldGet(thing, _A_foo, "f").call(thing);
    }
    methodN(thing) {
        __classPrivateFieldGet(thing, _A_foo, "f");
        __classPrivateFieldGet(thing, _a, "m", _A_m).call(thing);
        __classPrivateFieldGet(thing, _a, "f", _A_baz);
        thing.;
        __classPrivateFieldGet(thing, _A_foo, "f").call(thing);
    }
}
_a = A, _A_foo = new WeakMap(), _A_m = function _A_m() { };
_A_baz = { value: 10 };
;
