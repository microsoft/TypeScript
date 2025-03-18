//// [tests/cases/conformance/classes/members/privateNames/privateNameMethodsDerivedClasses.ts] ////

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
class Base {
    #prop() { return 123; }
    static method(x) {
        console.log(x.#prop());
    }
}
class Derived extends Base {
    static method(x) {
        console.log(x.#prop());
    }
}
