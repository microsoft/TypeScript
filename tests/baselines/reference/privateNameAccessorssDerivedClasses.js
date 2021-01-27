//// [privateNameAccessorssDerivedClasses.ts]
class Base {
    get #prop(): number { return  123; }
    static method(x: Derived) {
        console.log(x.#prop);
    }
}
class Derived extends Base {
    static method(x: Derived) {
        console.log(x.#prop);
    }
}


//// [privateNameAccessorssDerivedClasses.js]
var __classPrivateAccessorGet = (this && this.__classPrivateAccessorGet) || function (receiver, instances, fn) {
    if (!instances.has(receiver)) {
        throw new TypeError("attempted to get private accessor on non-instance");
    }
    return fn.call(receiver);
};
var _Base_prop_get, _Base_instances;
class Base {
    constructor() {
        _Base_instances.add(this);
    }
    static method(x) {
        console.log(__classPrivateAccessorGet(x, _Base_instances, _Base_prop_get));
    }
}
_Base_instances = new WeakSet(), _Base_prop_get = function _Base_prop_get() { return 123; };
class Derived extends Base {
    static method(x) {
        console.log(x.);
    }
}
