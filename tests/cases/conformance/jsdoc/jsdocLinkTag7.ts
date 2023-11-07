// @checkJs: true
// @allowJs: true
// @target: esnext
// @noEmit: true
// @filename: /a.js
class Foo {
    /**
     * {@linkcode this.a}
     * {@linkcode this.#c}
     */
    a() { }
    b() { }
    #c() { }
}
