//// [tests/cases/conformance/classes/members/privateNames/privateNamesInGenericClasses.ts] ////

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
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var _C_instances, _C_foo, _C_method, _C_prop_get, _C_prop_set;
class C {
    constructor() {
        _C_instances.add(this);
        _C_foo.set(this, void 0);
    }
    bar(x) { return __classPrivateFieldGet(x, _C_foo, "f"); } // OK
    bar2(x) { return __classPrivateFieldGet(x, _C_instances, "m", _C_method).call(x); } // OK
    bar3(x) { return __classPrivateFieldGet(x, _C_instances, "a", _C_prop_get); } // OK
    baz(x) { return __classPrivateFieldGet(x, _C_foo, "f"); } // OK
    baz2(x) { return __classPrivateFieldGet(x, _C_instances, "m", _C_method); } // OK
    baz3(x) { return __classPrivateFieldGet(x, _C_instances, "a", _C_prop_get); } // OK
    quux(x) { return __classPrivateFieldGet(x, _C_foo, "f"); } // OK
    quux2(x) { return __classPrivateFieldGet(x, _C_instances, "m", _C_method); } // OK
    quux3(x) { return __classPrivateFieldGet(x, _C_instances, "a", _C_prop_get); } // OK
}
_C_foo = new WeakMap(), _C_instances = new WeakSet(), _C_method = function _C_method() { return __classPrivateFieldGet(this, _C_foo, "f"); }, _C_prop_get = function _C_prop_get() { return __classPrivateFieldGet(this, _C_foo, "f"); }, _C_prop_set = function _C_prop_set(value) { __classPrivateFieldSet(this, _C_foo, value, "f"); };
a.; // Error
a.; // Error
a.; // Error
a = b; // Error
b = a; // Error
