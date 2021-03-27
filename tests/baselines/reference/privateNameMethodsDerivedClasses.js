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
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _Base_instances, _Base_prop;
class Base {
    constructor() {
        _Base_instances.add(this);
    }
    static method(x) {
        console.log(__classPrivateFieldGet(x, _Base_instances, "m", _Base_prop).call(x));
    }
}
_Base_instances = new WeakSet(), _Base_prop = function _Base_prop() { return 123; };
class Derived extends Base {
    static method(x) {
        console.log(x..call(x));
    }
}
