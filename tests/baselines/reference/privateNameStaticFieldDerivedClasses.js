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
var __classStaticPrivateFieldSet = (this && this.__classStaticPrivateFieldSet) || function (receiver, classConstructor, propertyDescriptor, value) {
    if (receiver !== classConstructor) {
        throw new TypeError("Private static access of wrong provenance");
    }
    propertyDescriptor.value = value;
    return value;
};
var __classStaticPrivateFieldGet = (this && this.__classStaticPrivateFieldGet) || function (receiver, classConstructor, propertyDescriptor) {
    if (receiver !== classConstructor) {
        throw new TypeError("Private static access of wrong provenance");
    }
    return propertyDescriptor.value;
};
var _Base_prop, _Derived_derivedProp;
class Base {
    static method(x) {
        Derived.; // error
        __classStaticPrivateFieldSet(// error
        Base, Base, _Base_prop, 10);
    }
}
_Base_prop = { value: 123 };
class Derived extends Base {
    static method(x) {
        __classStaticPrivateFieldGet(Derived, Derived, _Derived_derivedProp);
        Base. = 10; // error
    }
}
_Derived_derivedProp = { value: 10 };
