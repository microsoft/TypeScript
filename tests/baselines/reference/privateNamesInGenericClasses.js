//// [privateNamesInGenericClasses.ts]
class C<T> {
    #foo: T;
    #method(): T { return this.#foo; }
    get #prop(): T { return this.#foo; }
    set #prop(value : T) { this.#foo = value; }
    
    bar(x: C<T>) { return x.#foo; }          // OK
    bar2(x: C<T>) { return x.#method(); }    // OK
    bar3(x: C<T>) { return x.#prop; }        // OK

    baz(x: C<number>) { return x.#foo; }     // OK
    baz2(x: C<number>) { return x.#method; } // OK
    baz3(x: C<number>) { return x.#prop; }   // OK

    quux(x: C<string>) { return x.#foo; }    // OK
    quux2(x: C<string>) { return x.#method; }// OK
    quux3(x: C<string>) { return x.#prop; }  // OK
}

declare let a: C<number>;
declare let b: C<string>;
a.#foo;                                   // Error
a.#method;                                // Error
a.#prop;                                  // Error
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
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
};
var __classPrivateMethodGet = (this && this.__classPrivateMethodGet) || function (receiver, accessCheck, fn) {
    if (!accessCheck.has(receiver)) {
        throw new TypeError("attempted to get private method on non-instance");
    }
    return fn;
};
var _foo, _method, _method_1, _prop, _prop_1;
class C {
    constructor() {
        _method.add(this);
        _foo.set(this, void 0);
    }
    get () { return __classPrivateFieldGet(this, _foo); }
    set (value) { __classPrivateFieldSet(this, _foo, value); }
    bar(x) { return __classPrivateFieldGet(x, _foo); } // OK
    bar2(x) { return __classPrivateMethodGet(x, _method, _method_1).call(x); } // OK
    bar3(x) { return x.; } // OK
    baz(x) { return __classPrivateFieldGet(x, _foo); } // OK
    baz2(x) { return __classPrivateMethodGet(x, _method, _method_1); } // OK
    baz3(x) { return x.; } // OK
    quux(x) { return __classPrivateFieldGet(x, _foo); } // OK
    quux2(x) { return __classPrivateMethodGet(x, _method, _method_1); } // OK
    quux3(x) { return x.; } // OK
}
_foo = new WeakMap(), _method = new WeakSet(), _method_1 = function _method_1() { return __classPrivateFieldGet(this, _foo); };
a.; // Error
a.; // Error
a.; // Error
a = b; // Error
b = a; // Error
