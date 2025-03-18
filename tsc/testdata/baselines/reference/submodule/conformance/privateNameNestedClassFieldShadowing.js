//// [tests/cases/conformance/classes/members/privateNames/privateNameNestedClassFieldShadowing.ts] ////

//// [privateNameNestedClassFieldShadowing.ts]
class Base {
    #x;
    constructor() {
        class Derived {
            #x;
            testBase(x: Base) {
                console.log(x.#x);
            }
            testDerived(x: Derived) {
                console.log(x.#x);
            }
        }
    }
}


//// [privateNameNestedClassFieldShadowing.js]
class Base {
    #x;
    constructor() {
        class Derived {
            #x;
            testBase(x) {
                console.log(x.#x);
            }
            testDerived(x) {
                console.log(x.#x);
            }
        }
    }
}
