//// [tests/cases/conformance/classes/members/privateNames/privateNamesInNestedClasses-2.ts] ////

//// [privateNamesInNestedClasses-2.ts]
class A {
    static #x = 5;
    constructor () {
        class B {
            #x = 5;
            constructor() {
                class C {
                    constructor() {
                        A.#x // error
                    }
                }
            }
        }
    }
}


//// [privateNamesInNestedClasses-2.js]
"use strict";
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _a, _A_x;
class A {
    constructor() {
        var _B_x;
        class B {
            constructor() {
                _B_x.set(this, 5);
                class C {
                    constructor() {
                        __classPrivateFieldGet(_a, _B_x, "f"); // error
                    }
                }
            }
        }
        _B_x = new WeakMap();
    }
}
_a = A;
_A_x = { value: 5 };
