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
var __classPrivateMethodGet = (this && this.__classPrivateMethodGet) || function (receiver, instances, fn) {
    if (!instances.has(receiver)) {
        throw new TypeError("attempted to get private method on non-instance");
    }
    return fn;
};
var _Base_x, _Base_instances;
class Base {
    constructor() {
        var _Derived_x, _Derived_instances;
        _Base_instances.add(this);
        class Derived {
            constructor() {
                _Derived_instances.add(this);
            }
            ;
            testBase(x) {
                console.log(__classPrivateMethodGet(x, _Derived_instances, _Derived_x));
            }
            testDerived(x) {
                console.log(__classPrivateMethodGet(x, _Derived_instances, _Derived_x));
            }
        }
        _Derived_instances = new WeakSet(), _Derived_x = function _Derived_x() { };
    }
    ;
}
_Base_instances = new WeakSet(), _Base_x = function _Base_x() { };
