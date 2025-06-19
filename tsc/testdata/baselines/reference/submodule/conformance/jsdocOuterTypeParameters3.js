//// [tests/cases/conformance/jsdoc/jsdocOuterTypeParameters3.ts] ////

//// [jsdocOuterTypeParameters3.js]
/** @template {T} */
class Baz {
    m() {
        class Bar {
            static bar() { this.prototype.foo(); }
        }
    }
}


//// [jsdocOuterTypeParameters3.js]
/** @template {T} */
class Baz {
    m() {
        class Bar {
            static bar() { this.prototype.foo(); }
        }
    }
}
