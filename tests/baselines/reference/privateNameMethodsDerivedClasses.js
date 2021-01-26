//// [privateNameMethodsDerivedClasses.ts]
class Base {
    #prop(): number{ return  123; }
    static method(x: Derived) {
        console.log(x.#prop());
    }
}
class Derived extends Base {
    static method(x: Derived) {
        console.log(x.#prop());
    }
}


//// [privateNameMethodsDerivedClasses.js]
var __classPrivateMethodGet = (this && this.__classPrivateMethodGet) || function (receiver, instances, fn) {
    if (!instances.has(receiver)) {
        throw new TypeError("attempted to get private method on non-instance");
    }
    return fn;
};
var _Base_prop, _Base_instances;
class Base {
    constructor() {
        _Base_instances.add(this);
    }
    static method(x) {
        console.log(__classPrivateMethodGet(x, _Base_instances, _Base_prop).call(x));
    }
}
_Base_instances = new WeakSet(), _Base_prop = function _Base_prop() { return 123; };
class Derived extends Base {
    static method(x) {
        console.log(x..call(x));
    }
}
