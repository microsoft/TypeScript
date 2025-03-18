//// [tests/cases/conformance/classes/members/privateNames/privateNameAccessorssDerivedClasses.ts] ////

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
class Base {
    get #prop() { return 123; }
    static method(x) {
        console.log(x.#prop);
    }
}
class Derived extends Base {
    static method(x) {
        console.log(x.#prop);
    }
}
