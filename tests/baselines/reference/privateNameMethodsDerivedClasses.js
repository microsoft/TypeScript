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
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
};
var _prop;
class Base {
    () { return 123; }
    static method(x) {
        console.log(__classPrivateFieldGet(x, _prop).call(x));
    }
}
_prop = new WeakMap();
class Derived extends Base {
    static method(x) {
        console.log(x..call(x));
    }
}
