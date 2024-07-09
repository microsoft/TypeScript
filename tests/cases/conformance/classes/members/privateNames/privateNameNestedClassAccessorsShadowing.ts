// @target: es2015

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
