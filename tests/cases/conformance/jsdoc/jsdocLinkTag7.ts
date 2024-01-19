// @checkJs: true
// @allowJs: true
// @target: esnext
// @noEmit: true
// @filename: /a.js
class Foo {
    /**
     * {@linkcode this.a}
     * {@linkcode this.#c}
     *
     * {@link this.a}
     * {@link this.#c}
     *
     * {@linkplain this.a}
     * {@linkplain this.#c}
     */
    a() { }
    b() { }
    #c() { }
}
