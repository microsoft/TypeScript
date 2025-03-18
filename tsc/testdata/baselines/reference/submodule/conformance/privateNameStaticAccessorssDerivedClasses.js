//// [tests/cases/conformance/classes/members/privateNames/privateNameStaticAccessorssDerivedClasses.ts] ////

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
class Base {
    static get #prop() { return 123; }
    static method(x) {
        console.log(x.#prop);
    }
}
class Derived extends Base {
    static method(x) {
        console.log(x.#prop);
    }
}
