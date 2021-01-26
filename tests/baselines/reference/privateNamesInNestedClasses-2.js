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
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
};
var _A_x;
class A {
    constructor() {
        var _B_x;
        class B {
            constructor() {
                _B_x.set(this, 5);
                class C {
                    constructor() {
                        __classPrivateFieldGet(A, _B_x); // error
                    }
                }
            }
        }
        _B_x = new WeakMap();
    }
}
_A_x = new WeakMap();
_A_x.set(A, 5);
