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
var _x;
class A {
    constructor() {
        var _x_1;
        class B {
            constructor() {
                _x_1.set(this, 5);
                class C {
                    constructor() {
                        __classPrivateFieldGet(A, _x_1); // error
                    }
                }
            }
        }
        _x_1 = new WeakMap();
    }
}
_x = new WeakMap();
_x.set(A, 5);
