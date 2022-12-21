// @checkjs: true
// @filename: jsdocOuterTypeParameters3.js

/** @template {T} */
class Baz {
    m() {
        class Bar {
            static bar() { this.prototype.foo(); }
        }
    }
}
