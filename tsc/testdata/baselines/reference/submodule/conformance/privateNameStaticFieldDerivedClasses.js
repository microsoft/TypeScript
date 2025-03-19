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
class Base {
    static #prop = 123;
    static method(x) {
        Derived.#derivedProp; // error
        Base.#prop = 10;
    }
}
class Derived extends Base {
    static #derivedProp = 10;
    static method(x) {
        Derived.#derivedProp;
        Base.#prop = 10; // error
    }
}
