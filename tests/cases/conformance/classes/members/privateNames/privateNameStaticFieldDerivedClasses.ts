// @target: es2015

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

