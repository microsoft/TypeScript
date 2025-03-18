//// [tests/cases/conformance/classes/members/privateNames/privateNamesInNestedClasses-2.ts] ////

//// [privateNamesInNestedClasses-2.ts]
class A {
    static #x = 5;
    constructor () {
        class B {
            #x = 5;
            constructor() {
                class C {
                    constructor() {
                        A.#x // error
                    }
                }
            }
        }
    }
}


//// [privateNamesInNestedClasses-2.js]
class A {
    static #x = 5;
    constructor() {
        class B {
            #x = 5;
            constructor() {
                class C {
                    constructor() {
                        A.#x;
                    }
                }
            }
        }
    }
}
