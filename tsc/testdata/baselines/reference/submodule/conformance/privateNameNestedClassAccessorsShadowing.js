//// [tests/cases/conformance/classes/members/privateNames/privateNameNestedClassAccessorsShadowing.ts] ////

//// [privateNameNestedClassAccessorsShadowing.ts]
class Base {
    get #x() { return 1; };
    constructor() {
        class Derived {
            get #x() { return 1; };
            testBase(x: Base) {
                console.log(x.#x);
            }
            testDerived(x: Derived) {
                console.log(x.#x);
            }
        }
    }
}


//// [privateNameNestedClassAccessorsShadowing.js]
class Base {
    get #x() { return 1; }
    ;
    constructor() {
        class Derived {
            get #x() { return 1; }
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
