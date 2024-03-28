//// [tests/cases/conformance/classes/members/privateNames/privateNameStaticFieldDerivedClasses.ts] ////

//// [privateNameStaticFieldDerivedClasses.ts]
class Base {
    static #prop: number = 123;
    static method(x: Derived) {
        Derived.#derivedProp // error
        Base.#prop  = 10;
    }
}
class Derived extends Base {
    static #derivedProp: number = 10;
    static method(x: Derived) {
        Derived.#derivedProp
        Base.#prop  = 10; // error
    }
}



//// [privateNameStaticFieldDerivedClasses.js]
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _a, _Base_prop, _b, _Derived_derivedProp;
class Base {
    static method(x) {
        Derived.; // error
        __classPrivateFieldSet(_a, _a, 10, "f", _Base_prop);
    }
}
_a = Base;
_Base_prop = { value: 123 };
class Derived extends Base {
    static method(x) {
        __classPrivateFieldGet(_b, _b, "f", _Derived_derivedProp);
        Base. = 10; // error
    }
}
_b = Derived;
_Derived_derivedProp = { value: 10 };
