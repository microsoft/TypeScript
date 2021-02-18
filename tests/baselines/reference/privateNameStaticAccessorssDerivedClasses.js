//// [privateNameStaticAccessorssDerivedClasses.ts]
class Base {
    static get #prop(): number { return  123; }
    static method(x: typeof Derived) {
        console.log(x.#prop);
    }
}
class Derived extends Base {
    static method(x: typeof Derived) {
        console.log(x.#prop);
    }
}


//// [privateNameStaticAccessorssDerivedClasses.js]
var __classStaticPrivateAccessorGet = (this && this.__classStaticPrivateAccessorGet) || function (receiver, classConstructor, fn) {
    if (receiver !== classConstructor) {
        throw new TypeError("Private static access of wrong provenance");
    }
    return fn.call(receiver);
};
var _Base_prop_get;
class Base {
    static method(x) {
        console.log(__classStaticPrivateAccessorGet(x, Base, _Base_prop_get));
    }
}
_Base_prop_get = function _Base_prop_get() { return 123; };
class Derived extends Base {
    static method(x) {
        console.log(x.);
    }
}
