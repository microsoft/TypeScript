//// [privateNameNestedClassMethodShadowing.ts]
class Base {
    #x() { };
    constructor() {
        class Derived {
            #x() { };
            testBase(x: Base) {
                console.log(x.#x);
            }
            testDerived(x: Derived) {
                console.log(x.#x);
            }
        }
    }
}


//// [privateNameNestedClassMethodShadowing.js]
var __classPrivateMethodGet = (this && this.__classPrivateMethodGet) || function (receiver, accessCheck, fn) {
    if (!accessCheck.has(receiver)) {
        throw new TypeError("attempted to get private method on non-instance");
    }
    return fn;
};
var _x, _x_1;
class Base {
    constructor() {
        var _x_2, _x_3;
        _x.add(this);
        class Derived {
            constructor() {
                _x_2.add(this);
            }
            ;
            testBase(x) {
                console.log(__classPrivateMethodGet(x, _x_2, _x_3));
            }
            testDerived(x) {
                console.log(__classPrivateMethodGet(x, _x_2, _x_3));
            }
        }
        _x_2 = new WeakSet(), _x_3 = function _x_3() { };
    }
    ;
}
_x = new WeakSet(), _x_1 = function _x_1() { };
