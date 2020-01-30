//// [privateNameNestedClassFieldShadowing.ts]
class Base {
    #x;
    constructor() {
        class Derived {
            #x;
            testBase(x: Base) {
                console.log(x.#x);
            }
            testDerived(x: Derived) {
                console.log(x.#x);
            }
        }
    }
}


//// [privateNameNestedClassFieldShadowing.js]
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
};
var _x;
class Base {
    constructor() {
        var _x_1;
        _x.set(this, void 0);
        class Derived {
            constructor() {
                _x_1.set(this, void 0);
            }
            testBase(x) {
                console.log(__classPrivateFieldGet(x, _x_1));
            }
            testDerived(x) {
                console.log(__classPrivateFieldGet(x, _x_1));
            }
        }
        _x_1 = new WeakMap();
    }
}
_x = new WeakMap();
