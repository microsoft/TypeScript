//// [privateNameNestedClassAccessorsShadowing.ts]
class Base {
    get #x() { return 1; };
    constructor() {
        class Derived {
            get #x() { return 1; };
            testBase(x: Base) {
                console.log(x.#x);
            }
            testDerived(x: Derived) {
                console.log(x.#x);
            }
        }
    }
}


//// [privateNameNestedClassAccessorsShadowing.js]
var __classPrivateAccessorGet = (this && this.__classPrivateAccessorGet) || function (receiver, instances, fn) {
    if (!instances.has(receiver)) {
        throw new TypeError("attempted to get private accessor on non-instance");
    }
    return fn.call(receiver);
};
var _Base_x_get, _Base_instances;
class Base {
    constructor() {
        var _Derived_x_get, _Derived_instances;
        _Base_instances.add(this);
        class Derived {
            constructor() {
                _Derived_instances.add(this);
            }
            ;
            testBase(x) {
                console.log(__classPrivateAccessorGet(x, _Derived_instances, _Derived_x_get));
            }
            testDerived(x) {
                console.log(__classPrivateAccessorGet(x, _Derived_instances, _Derived_x_get));
            }
        }
        _Derived_instances = new WeakSet(), _Derived_x_get = function _Derived_x_get() { return 1; };
    }
    ;
}
_Base_instances = new WeakSet(), _Base_x_get = function _Base_x_get() { return 1; };
