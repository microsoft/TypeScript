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
var _Base_x;
class Base {
    constructor() {
        var _Derived_x;
        _Base_x.set(this, void 0);
        class Derived {
            constructor() {
                _Derived_x.set(this, void 0);
            }
            testBase(x) {
                console.log(__classPrivateFieldGet(x, _Derived_x));
            }
            testDerived(x) {
                console.log(__classPrivateFieldGet(x, _Derived_x));
            }
        }
        _Derived_x = new WeakMap();
    }
}
_Base_x = new WeakMap();
