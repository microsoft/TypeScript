//// [tests/cases/conformance/classes/members/privateNames/privateNameFieldDerivedClasses.ts] ////

//// [privateNameFieldDerivedClasses.ts]
class Base {
    #prop: number = 123;
    static method(x: Derived) {
        console.log(x.#prop);
    }
}
class Derived extends Base {
    static method(x: Derived) {
        console.log(x.#prop);
    }
}



//// [privateNameFieldDerivedClasses.js]
class Base {
    #prop = 123;
    static method(x) {
        console.log(x.#prop);
    }
}
class Derived extends Base {
    static method(x) {
        console.log(x.#prop);
    }
}
