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
var __classPrivateMethodGet = (this && this.__classPrivateMethodGet) || function (receiver, accessCheck, fn) {
    if (!accessCheck.has(receiver)) {
        throw new TypeError("attempted to get private method on non-instance");
    }
    return fn;
};
var _prop, _prop_1;
class Base {
    constructor() {
        _prop.add(this);
    }
    static method(x) {
        console.log(__classPrivateMethodGet(x, _prop, _prop_1).call(x));
    }
}
_prop = new WeakSet(), _prop_1 = function _prop_1() { return 123; };
class Derived extends Base {
    static method(x) {
        console.log(x..call(x));
    }
}
