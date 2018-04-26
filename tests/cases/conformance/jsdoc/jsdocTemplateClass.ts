// @allowJs: true
// @checkJs: true
// @noEmit: true
// @Filename: templateTagOnClasses.js

/**
 * @template {T}
 * @typedef {(t: T) => T} Id
 */
class Foo {
    /** @typedef {(t: T) => T} Id2 */
    /** @param {T} x */
    constructor (x) {
        this.a = x
    }
    /**
     * 
     * @param {T} x 
     * @param {Id} y
     * @param {Id2} alpha
     * @return {T}
     */
    foo(x, y, alpha) {
        return alpha(y(x))
    }
}
var f = new Foo(1)
var g = new Foo(false)
f.a = g.a
