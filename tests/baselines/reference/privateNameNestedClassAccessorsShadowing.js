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
var _Base_x;
class Base {
    constructor() {
        var _Derived_x;
        class Derived {
            get () { return 1; }
            ;
            testBase(x) {
                console.log(x.);
            }
            testDerived(x) {
                console.log(x.);
            }
        }
    }
    get () { return 1; }
    ;
}
