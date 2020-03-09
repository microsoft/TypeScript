//// [privateNamesInNestedClasses-1.ts]
class A {
   #foo = "A's #foo";
   #bar = "A's #bar";
   method () {
       class B {
           #foo = "B's #foo";
           bar (a: any) {
               a.#foo; // OK, no compile-time error, don't know what `a` is
           }
           baz (a: A) {
               a.#foo; // compile-time error, shadowed
           }
           quux (b: B) {
               b.#foo; // OK
           }
       }
       const a = new A();
       new B().bar(a);
       new B().baz(a);
       const b = new B();
       new B().quux(b);
   }
}

new A().method();


//// [privateNamesInNestedClasses-1.js]
"use strict";
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
};
var _foo, _bar;
class A {
    constructor() {
        _foo.set(this, "A's #foo");
        _bar.set(this, "A's #bar");
    }
    method() {
        var _foo_1;
        class B {
            constructor() {
                _foo_1.set(this, "B's #foo");
            }
            bar(a) {
                __classPrivateFieldGet(a, _foo_1); // OK, no compile-time error, don't know what `a` is
            }
            baz(a) {
                __classPrivateFieldGet(a, _foo_1); // compile-time error, shadowed
            }
            quux(b) {
                __classPrivateFieldGet(b, _foo_1); // OK
            }
        }
        _foo_1 = new WeakMap();
        const a = new A();
        new B().bar(a);
        new B().baz(a);
        const b = new B();
        new B().quux(b);
    }
}
_foo = new WeakMap(), _bar = new WeakMap();
new A().method();
