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
var __classPrivateMethodGet = (this && this.__classPrivateMethodGet) || function (receiver, instances, fn) {
    if (!instances.has(receiver)) {
        throw new TypeError("attempted to get private method on non-instance");
    }
    return fn;
};
var __classPrivateAccessorGet = (this && this.__classPrivateAccessorGet) || function (receiver, instances, fn) {
    if (!instances.has(receiver)) {
        throw new TypeError("attempted to get private accessor on non-instance");
    }
    return fn.call(receiver);
};
var _C_foo, _C_method, _C_prop_get, _C_prop_set, _C_instances;
class C {
    constructor() {
        _C_instances.add(this);
        _C_foo.set(this, void 0);
    }
    bar(x) { return __classPrivateFieldGet(x, _C_foo); } // OK
    bar2(x) { return __classPrivateMethodGet(x, _C_instances, _C_method).call(x); } // OK
    bar3(x) { return __classPrivateAccessorGet(x, _C_instances, _C_prop_get); } // OK
    baz(x) { return __classPrivateFieldGet(x, _C_foo); } // OK
    baz2(x) { return __classPrivateMethodGet(x, _C_instances, _C_method); } // OK
    baz3(x) { return __classPrivateAccessorGet(x, _C_instances, _C_prop_get); } // OK
    quux(x) { return __classPrivateFieldGet(x, _C_foo); } // OK
    quux2(x) { return __classPrivateMethodGet(x, _C_instances, _C_method); } // OK
    quux3(x) { return __classPrivateAccessorGet(x, _C_instances, _C_prop_get); } // OK
}
_C_foo = new WeakMap(), _C_instances = new WeakSet(), _C_method = function _C_method() { return __classPrivateFieldGet(this, _C_foo); }, _C_prop_get = function _C_prop_get() { return __classPrivateFieldGet(this, _C_foo); }, _C_prop_set = function _C_prop_set(value) { __classPrivateFieldSet(this, _C_foo, value); };
a.; // Error
a.; // Error
a.; // Error
a = b; // Error
b = a; // Error
