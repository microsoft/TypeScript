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
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _Base_instances, _Base_x_get;
class Base {
    constructor() {
        var _Derived_instances, _Derived_x_get;
        _Base_instances.add(this);
        class Derived {
            constructor() {
                _Derived_instances.add(this);
            }
            ;
            testBase(x) {
                console.log(__classPrivateFieldGet(x, _Derived_instances, "a", _Derived_x_get));
            }
            testDerived(x) {
                console.log(__classPrivateFieldGet(x, _Derived_instances, "a", _Derived_x_get));
            }
        }
        _Derived_instances = new WeakSet(), _Derived_x_get = function _Derived_x_get() { return 1; };
    }
    ;
}
_Base_instances = new WeakSet(), _Base_x_get = function _Base_x_get() { return 1; };
