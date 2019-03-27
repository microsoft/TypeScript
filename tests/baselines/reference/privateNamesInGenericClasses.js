//// [privateNamesInGenericClasses.ts]
class C<T> {
    #foo: T;
    bar(x: C<T>) { return x.#foo; }          // OK
    baz(x: C<number>) { return x.#foo; }     // OK
    quux(x: C<string>) { return x.#foo; }    // OK
}

declare let a: C<number>;
declare let b: C<string>;
a.#foo;                                   // Error
a = b;                                    // Error
b = a;                                    // Error


//// [privateNamesInGenericClasses.js]
"use strict";
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
};
var _foo;
class C {
    constructor() {
        _foo.set(this, void 0);
    }
    bar(x) { return __classPrivateFieldGet(x, _foo); } // OK
    baz(x) { return __classPrivateFieldGet(x, _foo); } // OK
    quux(x) { return __classPrivateFieldGet(x, _foo); } // OK
}
_foo = new WeakMap();
a.; // Error
a = b; // Error
b = a; // Error
