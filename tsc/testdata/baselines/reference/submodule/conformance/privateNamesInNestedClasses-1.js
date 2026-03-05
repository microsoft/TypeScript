//// [tests/cases/conformance/classes/members/privateNames/privateNamesInNestedClasses-1.ts] ////

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
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _A_foo, _A_bar;
class A {
    constructor() {
        _A_foo.set(this, "A's #foo");
        _A_bar.set(this, "A's #bar");
    }
    method() {
        var _B_foo;
        class B {
            constructor() {
                _B_foo.set(this, "B's #foo");
            }
            bar(a) {
                __classPrivateFieldGet(a, _B_foo, "f"); // OK, no compile-time error, don't know what `a` is
            }
            baz(a) {
                __classPrivateFieldGet(a, _B_foo, "f"); // compile-time error, shadowed
            }
            quux(b) {
                __classPrivateFieldGet(b, _B_foo, "f"); // OK
            }
        }
        _B_foo = new WeakMap();
        const a = new A();
        new B().bar(a);
        new B().baz(a);
        const b = new B();
        new B().quux(b);
    }
}
_A_foo = new WeakMap(), _A_bar = new WeakMap();
new A().method();
