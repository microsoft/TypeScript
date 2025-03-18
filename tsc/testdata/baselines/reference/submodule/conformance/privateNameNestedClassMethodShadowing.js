//// [tests/cases/conformance/classes/members/privateNames/privateNameNestedClassMethodShadowing.ts] ////

//// [privateNameNestedClassMethodShadowing.ts]
class Base {
    #x() { };
    constructor() {
        class Derived {
            #x() { };
            testBase(x: Base) {
                console.log(x.#x);
            }
            testDerived(x: Derived) {
                console.log(x.#x);
            }
        }
    }
}


//// [privateNameNestedClassMethodShadowing.js]
class Base {
    #x() { }
    ;
    constructor() {
        class Derived {
            #x() { }
            ;
            testBase(x) {
                console.log(x.#x);
            }
            testDerived(x) {
                console.log(x.#x);
            }
        }
    }
}
